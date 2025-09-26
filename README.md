# 🎮 Platforma do grania w gry przeglądarkowe

**Platforma** to aplikacja webowa umożliwiająca zalogowanym użytkownikom rozgrywkę w gry przeglądarkowe oraz rywalizację z innymi graczami dzięki systemowi punktów i rankingów.  
Aplikacja działa **lokalnie** – nie posiada hostingu, więc uruchamiana jest na własnym serwerze (np. poprzez **Docker**).

---

## ✨ Funkcjonalności platformy
- 🔐 **Logowanie i rejestracja** — dostęp do gier tylko dla zalogowanych użytkowników  
- 🕹 **Rozgrywka online** — możliwość gry w różne klasyczne gry przeglądarkowe  
- 🏆 **Ranking punktowy** — rywalizacja między użytkownikami na podstawie zdobytych punktów  
- 📊 **Profil gracza** — podgląd swoich wyników oraz statystyk  
- ⚙️ **Serwer lokalny** — aplikacja działa w środowisku **Docker** z wykorzystaniem **PHP** i **MariaDB**

---

## 🎲 Dostępne gry

| Gra          | Status          | Opis                              |
|-------------|----------------|------------------------------------|
| 🐍 Snake    | ✔️ Gotowy   | Klasyczna gra, zbieranie punktów i wzrost węża |
| 💣 Saper    | ✔️ Gotowy       | Odkrywaj pola i unikaj min        |
| 🧩 Tetris   | ✔️ Gotowy       | Układaj klocki, zdobywaj punkty   |
| ❌ Tic Tac Toe | 🔧 Do lekkich popraw wizualnych   | Popularna gra w kółko i krzyżyk   |
| 🦖 Dino Run | ✔️ Gotowy | Gra inspirowana trybem offline w Chrome |

---

💡 **Info:** Aplikacja jest wciąż rozwijana — planowane są kolejne gry oraz usprawnienia w systemie rankingu.


## 🛠 Wykorzystane technologie
- HTML5, CSS3, JavaScript (ES6+)
- PHP 8.2.12
- biblioteka do języka PHP - PDO (PHP Data Objects)
- 10.4.32-MariaDB MySQL
- Boxicons(https://boxicons.com/) — ikony
- pakiet XAMPP v3.3.0
- Docker
- AJAX - Wysyłanie danych za pomocą JSON z plików JS do PHP
- Composer - biblioteka języka PHP
- Ratchet - biblioteka języka PHP służąca do tworzenia połączeń WebSocket

### ⚡ Szybka instalacja
1. **Pobierz projekt**  
   - Sklonuj repozytorium:
     ```bash
     git clone https://github.com/XxpolipxX/Platforma-do-gierkuf.git
     ```
   - Lub pobierz jako `.zip` i rozpakuj w wybranej lokalizacji.

2. **Zainstaluj i skonfiguruj Dockera**  
   - Pobierz Docker [https://www.docker.com/get-started/](https://www.docker.com/get-started/)  

3. **Skonfiguruj połączenie z bazą**  
   - Przejdź do pliku:
     ```
     /Platforma-do-gierkuf/src/php/db.php
     ```
   - Uzupełnij dane dostępowe:
     ```php
     $host = 'db';
     $db   = 'gierkowo';
     $user = 'root';
     $pass = 'root';
     $charset = 'utf8mb4';
     ```
4. **Odpal Dockera**  
   - Zbuduj kontener
     ``` bash
     docker-compose build
     ```
   - Odpal kontener
     ``` bash
     docker-compose up -d
     ```

5. **Sprawdź działanie AJAX i Boxicons**  
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



## 🗄️ Opis bazy danych

Projekt korzysta z bazy danych **MariaDB 10.4.32**.  
Baza składa się z kilku tabel przechowujących informacje potrzebne do działania aplikacji.

### **1. users** – tabela użytkowników
| Kolumna       | Typ danych        | Klucz | Opis                                   |
|--------------|------------------|-------|---------------------------------------|
| id           | INT          | PK    | Unikalny identyfikator użytkownika   |
| username     | VARCHAR(50)      | UNIQUE| Login użytkownika                   |
| email        | VARCHAR(100)     | UNIQUE| Adres e-mail użytkownika            |
| password_hash     | VARCHAR(255)     |       | Zahashowane hasło za pomocą funkcji języka PHP password_hash, gdzie jako argumenty są podane hasło bez hashowania i PASSWORD_DEFAULT                   |
| current_win_streak         |INT  |     | Przechowuje obecną serię wygranych gier w trybie wieloosobwym. W przypadku gier dla pojedynczego gracza nie ma znaczenia i nie jest aktualizowana                    |
|max_win_streak         |INT  |     | Przechowuje maksymalną serię wygranych gier w trybie wieloosobwym, którą użytkownik osiągnął. W przypadku gier dla pojedynczego gracza nie ma znaczenia i nie jest aktualizowana                    |
| created_at   | TIMESTAMP        |       | Data utworzenia konta               |

---

### **2. games** – tabela gier znajdujących się na naszej platformie  
| Kolumna      | Typ danych   | Klucz | Opis                              |
|-------------|-------------|-------|----------------------------------|
| id          | INT     | PK    | Unikalny identyfikator gry     |
| name     | VARCHAR(50)     |  UNIQUE   | Nazwa gry w serwisie    |
| description       | TEXT|       | Opis gry                      |
| max_players     | INT        |       | Maksymalna ilość graczy, która może grać razem w grę. Domyślnie jest to 1, dla gier dla dwóch osób będzie to 2                     |
| created_at  | TIMESTAMP   |       | Data utworzenia gry            |

---

### **3. scores** – tabela przechowywująca wyniki osiągnięte przez graczy  
| Kolumna      | Typ danych   | Klucz | Opis                              |
|-------------|-------------|-------|----------------------------------|
| id          | INT     | PK    | Unikalny identyfikator wyniku     |
| user_id     | INT     |  FK   | Unikalny identyfikator użytkownika, który osiągnął wynik    |
| game_id       | INT|   FK    | Unikalny identyfikator gry, w której został osiągnięty wynik                      |
| score     | INT        |       | Liczba punktów zdobytych                     |
| created_at  | TIMESTAMP   |       | Data utworzenia wyniku            |

---

### **4. multiplayer_rooms** – tabela przechowywująca pokoje wykorzystywane przez graczy do gry w kółko i krzyżyk
| Kolumna      | Typ danych   | Klucz | Opis                              |
|-------------|-------------|-------|----------------------------------|
| id          | INT     | PK    | Unikalny identyfikator pokoju     |
| player1_id       | INT|   FK    | Unikalny identyfikator pierwszego użytkownika, który będzie grał w grę                      |
| player2_id     | INT        |  FK     | Unikalny identyfikator drugiego użytkownika, który będzie grał w grę                     |
| join_code  | CHAR(6)   |   UNIQUE    | Kod dołączenia do pokoju przez drugiego gracza            |
| status  | ENUM('waiting', 'in_progress', 'finished')   |       | Status gry. `waiting` - czeka na 2 gracza, `in_progress` - trwa rozgrywka, `finished` - rozgrywka została zakończona            |
| winner_id  | INT   |  FK     | Unikalny identyfikator użytkownika, który wygrał            |
| loser_id  | INT   |  FK     | Unikalny identyfikator użytkownika, który przegrał            |
| created_at  | TIMESTAMP   |       | Data utworzenia pokoju            |

💡 **Uwagi techniczne**:
- Wszystkie relacje obsługiwane są za pomocą **PDO**.
- Dla kluczy obcych ustawiono **ON DELETE CASCADE**.
- Hasła użytkowników są szyfrowane za pomocą funkcji `password_hash()` w języku PHP.
- Aplikacja na portach 3306(baza danych), 8080(apache), 8081(WebSocket).
