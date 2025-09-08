# Platforma-do-gierkuf
Platforma do grania w giereczki

Platforma ma za zadanie umożliwienie zalogowanym użytkownikom zagranie w gry przeglądarkowe, a także tworzenie rankingu punktowego z innymi użytkownikami. Aplikacja nie posiada hostingu - działa na serwerze lokalnym

Dostępne gry w naszym serwisie to:
- [x] Snake (trzeba wypucować)
- [ ] Saper
- [ ] Tetris
- [ ] Tic Tac Toe
- [ ] Dino run ???


## 🛠 Wykorzystane technologie
- HTML5, CSS3, JavaScript (ES6+)
- PHP 8.2.12
- biblioteka do języka PHP - PDO (PHP Data Objects)
- 10.4.32-MariaDB MySQL
- Boxicons(https://boxicons.com/) — ikony
- pakiet XAMPP v3.3.0
- AJAX - Wysyłanie danych za pomocą JSON z plików JS do PHP

### ⚡ Szybka instalacja
1. **Pobierz projekt**  
   - Sklonuj repozytorium:
     ```bash
     git clone https://github.com/XxpolipxX/Platforma-do-gierkuf.git
     ```
   - Lub pobierz jako `.zip` i rozpakuj w wybranej lokalizacji.

2. **Zainstaluj i skonfiguruj XAMPP**  
   - Pobierz [XAMPP v3.3.0](https://www.apachefriends.org/pl/index.html)  
   - Upewnij się, że używasz **PHP 8.2.12** i bazy **MariaDB 10.4.32**.  
   - Uruchom **Apache** oraz **MySQL** w panelu XAMPP.
  
3. **Skonfiguruj bazę danych**  
   - Otwórz `http://localhost/phpmyadmin`.
   - Utwórz nową bazę danych (w projekcie jest użyta nazwa `gierkowo`).
   - Zaimportuj plik `gierkowo.sql` znajdujący się w folderze projektu, np.:
     ```
     /Platforma-do-gierkuf/baza/gierkowo.sql
     ```

4. **Skonfiguruj połączenie z bazą**  
   - Przejdź do pliku:
     ```
     /Platforma-do-gierkuf/php/db.php
     ```
   - Uzupełnij dane dostępowe:
     ```php
     $host = 'localhost';
     $db   = 'gierkowo';
     $user = 'root';
     $pass = '';
     $charset = 'utf8mb4';
     ```

5. **Umieść projekt w katalogu serwera**  
   - Przenieś folder projektu do:
     ```
     C:\xampp\htdocs\
     ```
   - Następnie uruchom projekt w przeglądarce:
     ```
     http://localhost/Platforma-do-gierkuf
     ```

6. **Sprawdź działanie AJAX i Boxicons**  
   - Upewnij się, że masz dostęp do internetu — Boxicons są ładowane z CDN.
   - Skrypty JS komunikują się z plikami PHP poprzez AJAX z użyciem **JSON**.

---

💡 **Tip:** Jeśli podczas instalacji pojawią się błędy połączenia z bazą, sprawdź:
  - czy `PDO` jest włączone w pliku `php.ini`,
  - czy usługa MySQL jest uruchomiona w XAMPP,
  - czy usługa Apache jest uruchomiona w XAMPP,
  - poprawność danych logowania w pliku `/Platforma-do-gierkuf/php/db.php`.

🎉 **Powodzenia w instalacji i korzystaniu z projektu!**  
Jeśli wszystko przebiegło pomyślnie, możesz od razu zacząć testować funkcjonalności aplikacji 🚀
