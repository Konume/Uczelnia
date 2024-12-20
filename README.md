# Uczelnia

## Opis

Projekt "Uczelnia" to aplikacja wspierająca zarządzanie procesami akademickimi. Umożliwia zarządzanie danymi studentów, wykładowców, przedmiotów, planami zajęć i wynikami egzaminów. Projekt może być wykorzystany jako baza dla systemów zarządzania uczelniami wyższymi lub w celach edukacyjnych.

## Funkcjonalności

- Rejestrowanie i zarządzanie studentami, wykładowcami i przedmiotami.
- Tworzenie i przeglądanie planów zajęć.
- Zapisywanie i analiza wyników egzaminów.
- Obsługa różnych ról użytkowników (administrator, student, wykładowca).

## Wymagania

- Java 11+
- Gradle/Maven (do zarządzania zależnościami)
- Relacyjna baza danych (np. MySQL, PostgreSQL lub H2 do testów)
- Kontener aplikacji (np. Apache Tomcat, Spring Boot)

## Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Konume/Uczelnia.git
   cd Uczelnia
   ```

2. Skonfiguruj bazę danych:
   - Utwórz bazę danych o nazwie `uczelnia`.
   - W pliku `application.properties` (lub `application.yml`) wprowadź odpowiednie dane dostępowe do bazy danych.

3. Zbuduj projekt:
   ```bash
   ./gradlew build
   ```

4. Uruchom aplikację:
   ```bash
   java -jar build/libs/uczelnia.jar
   ```

## Użycie

1. Otwórz aplikację w przeglądarce pod adresem [http://localhost:8080](http://localhost:8080).
2. Zaloguj się jako administrator, aby rozpocząć konfigurację.
   - Domyślne dane logowania:
     - **Login**: `admin`
     - **Hasło**: `admin123`

## Dokumentacja

Szczegółowa dokumentacja projektu, w tym diagramy UML, opisy endpointów API oraz instrukcje konfiguracyjne, znajduje się w katalogu `docs` w repozytorium.

## Wkład

Prosimy o zgłaszanie błędów, sugestii i pomysłów poprzez system zgłoszeń (Issues) w repozytorium. Pull requesty są mile widziane.

## Licencja

Projekt "Uczelnia" jest licencjonowany na warunkach licencji MIT. Szczegóły znajdują się w pliku [LICENSE](LICENSE).

---

Dziękujemy za zainteresowanie projektem!
