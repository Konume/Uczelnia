using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Uczelnia.Server.Models;

namespace Uczelnia.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectsController : ControllerBase
    {
        private readonly SubjectsContext _context;

        public SubjectsController(SubjectsContext context)
        {
            _context = context;
            if (_context.Subjects.Count() == 0)
            {
                _context.Subjects.Add(new Subjects { Name = "Wykład" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Subjects> GetSubjects()
        {
            return _context.Subjects.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Subjects> GetSubject(int id)
        {
            var subject = _context.Subjects.Find(id);

            if (subject == null)
            {
                return NotFound();
            }
            return subject;
        }

        [HttpPost]
        public ActionResult<Subjects> PostSubject(Subjects subject)
        {
            _context.Subjects.Add(subject);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetSubject), new { id = subject.Id }, subject);
        }

        [HttpPut("{id}")]
        public IActionResult PutSubject(int id, Subjects subject)
        {
            if (id != subject.Id)
            {
                return BadRequest();
            }

            var existingSubject = _context.Subjects.AsNoTracking().FirstOrDefault(s => s.Id == id);
            if (existingSubject == null)
            {
                return NotFound();
            }

            _context.Entry(subject).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSubject(int id)
        {
            var subject = _context.Subjects.Find(id);

            if (subject == null)
            {
                return NotFound();
            }

            _context.Subjects.Remove(subject);
            _context.SaveChanges();

            return NoContent();
        }

        private bool SubjectExists(int id)
        {
            return _context.Subjects.Any(e => e.Id == id);
        }
    }
}
