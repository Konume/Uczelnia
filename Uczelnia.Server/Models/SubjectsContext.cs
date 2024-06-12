using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Uczelnia.Server.Models
{
    public class SubjectsContext : DbContext
    {
        public DbSet<Subjects> Subjects { get; set; }

        public SubjectsContext(DbContextOptions<SubjectsContext> options) : base(options)
        {
        }
    }
}
