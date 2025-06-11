# Planety Godot

## Wstęp

Projekt "Planety Godot" to zaawansowana wizualizacja generowanych planet z wykorzystaniem silnika Godot w wersji Web. Obecnie projekt pozwala na podgląd dynamicznie budowanych planet ale z pomocą dopracowanej nakładki UI może pozwolić też na kontrolowanie ich parametrów. Celem projektu jest edukacja i demonstracja możliwości silnika Godot w integracjach aplikacji internetowych.

## Funkcjonalność

- Podgląd dynamicznie budowanych planet
- Wywoływanie funkcji w Godot przy pomocy JavaScript
- Możliwe rozbudowanie o pełną kontrole parametrów planet
- Wczytywanie predefiniowanych parametrów konstrukcji planet
- Zaawansowane efekty wizualne, dynamiczne oświetlenie

## Wymagania

Aby uruchomić projekt "Planety Godot", potrzebujesz:

- Node.js (wersja 18 lub nowsza)
- npm (wersja 9 lub nowsza)

## Instalacja

Aby zainstalować projekt "Planety Godot", wykonaj poniższe kroki:

1. **Klonowanie repozytorium**:
    ```bash
    git clone https://github.com/Maciej-Szczecinski/Planety-Godot.git
    cd planety_godot
    ```

2. **Instalacja zależności**:
    Upewnij się, że masz zainstalowany Node.js i npm. Następnie zainstaluj zależności projektu:
    ```bash
    npm install
    ```
	Jeżeli polecenie zakończy się niepowodzeniem, to możliwe, że powstała kolizja wymaganych wersji dodatkowego oprogramowania.
	Błąd ten można obejść bez zauważalnych konsekwencji przez wymuszenie pominięcia listy wymagań:
	```bash
    npm install --force
    ```

## Konfiguracja i uruchomienie

Aby uruchomić projekt lokalnie, wykonaj poniższe kroki:

1. **Uruchomienie projektu**:
    Użyj poniższego polecenia, aby uruchomić projekt:
    ```bash
    npm run dev
    ```
    Projekt nie jest "zbudowany" więc nie uruchamia się domyślnym poleceniem "npm start".

2. **Otwieranie w przeglądarce**:
    Po uruchomieniu projektu, otwórz przeglądarkę i przejdź do adresu `http://localhost:5137`, aby zobaczyć wizualizację wybranych planet.

## Przykładowy zestaw planet

Projekt zawiera wstępnie zdefiniowane dane dla konstrukcji kilku planet:
-Ziemia
-Mars
-Wenus

## Interakcja użytkownika

Użytkownicy mogą przeprowadzać następujące interakcje na działającym projekcie:

- **Śledzenie planet**: Użytkownik domyślne porusza się kamerą po orbicie podglądowej planety.
- **Wczytywanie predefiniowanych parametrów konstrukcyjnych planet**: Użytkownik może wybrać jeden z predefiniowanych typów planety.
- **Modyfikowanie planet**: Interfejs w wersji JavaScript nie jest gotowy ale obecna konfiguracja konstruktora planet pozwala na liczne modyfikacje parametrów.
- **Debugowanie**: Użytkownik ma dostęp do podglądu konsoli w przeglądarce, gdzie kod generuje podsumowanie z opisanych interakcji między JavaScript a Godot.

## Struktura projektu

Projekt "Planety Godot" składa się z następujących plików i folderów:

- `src/main.js`: Główny plik JavaScript zawierający logikę projektu.
- `src/style.css`: Plik CSS zawierający style dla projektu.
- `index.html`: Plik HTML zawierający strukturę strony.
- `README.md`: Plik dokumentacji projektu.
- `node_modules/`: Folder zawierający wszystkie wymagane moduły Node.js.
- `package.json`: Plik konfiguracyjny projektu zawierający zależności.
- `public/`: Folder zawierający pliki eksportowanego projektu z edytora Godot
- wiele innych plików zależnych od poszczególnych modułów.

## Technologie

Projekt "Planety Godot" wykorzystuje następujące technologie:

- **Godot**: Wieloplatformowy silnik gier do tworzenia gier 2D i 3D z ujednoliconego interfejsu. Zapewnia kompleksowy zestaw typowych narzędzi, dzięki czemu użytkownicy mogą skupić się na tworzeniu gier bez konieczności wymyślania koła na nowo. 
- **vite-plugin-godot** (wersja 1.0): Biblioteka do wstępnej konfiguracji projektu Vite do wczytywania plików eksportowanych przez Godot.
- **JavaScript**: Język programowania używany do implementacji logiki projektu.
- **HTML**: Język znaczników używany do tworzenia struktury strony.
- **CSS**: Język stylów używany do stylizacji strony.
- **Vite**: Narzędzie do budowania i uruchamiania projektu.

## Napotkane problemy:

Sam proces obsługi i konstrukcji planet zasługuje na osobny artykuł więc tutaj opiszę tylko problemy napotkane podczas tworzenie warstwy interakcji między JavaScript a silnikiem Godot.
Wynikiem eksportowania projektu z edytora Godot do presetu aplikacji Web tracimy większość zaawansowanej funkcjonalność silnika: brak dokładnych modeli oświetlenia, brak wielu efektów wizualnych, brak kompatybilności z API Vulkan itp.
W przeciwieństwie do starszych wersji silnika, eksport Web w Godot 4.4.1 nie udostępnia funckji "godot" globalnie, co uniemożliwia tworzenie odwołań skierowanych bezpośrednio do silnika.
Jednym z większych poroblemów był brak możliwości wczytania wskazanych funckji przez main.js, ponieważ Godot inicjalizował się asynchronicznie. Wymusiło to dodanie mechanizmów oczekiwania i dużej ilości kodu służącego wyłącznie do debugowania.
Nawet pomimo stosowania prawidłowych metod komunikacji(aktualnych dla wykorzystywanej wersji silnika), wielekrotnie natknąłem się na ograniczenia wywołane mechanizmem sandbox: od braku dostępu po całkowity brak odpowiedzi. 
Powyższy problem w połączeniu z błędnym tagowaniem wersji typów plików JSON przez Godot spodowodował, że zrezygnowałem z eksportowania i importowania plików między warstwą Web a silnikiem aplikacji. Ilość zabezpieczeń, które trzeba pominąć w celu prawidłowego importowania danych mija się z celem ćwiczenia.
Ostatecznym rozwiązaniem problemu z komunikacją okazało się podejście z pollingiem: funkcje przekazywania danych z JS do Godot są stale wykonywane w żywym procesie interakcji zamiast czekać na poszczególne wywoływanie(zastosowanie większej ilości takich funkcji może znacząco wpłynąć na wydajność).
Pomimo rozwiązania głównych problemów komunikacji projekt wciąż ma wiele niedociągnięć na które nie mam wpływu lub przerastają moją wiedzę na temat ich działania: 
- model oświetlenia wciąż posiada liczne artefakty(wina eksportowania w trybie zgodności Web),
- przekazywane z JavaScript funkcje zawierają tylko wzkaźniki zmiany danych zamiast ich pełne zasoby(to znaczy: zmień na "Zawarty Preset", zmiast: zmień na "Pełny słownik parametrów konstrukcyjnych zaimportowany z przeglądarki"),
- brak nakładki UI do sterowania poszególnymi parametrami planet(wymaga zbudowania zaawansowanej warstwy interakcji między danymi JS i Godot, co z obecnymi problemami z komunikacją wydaje mi się niemożliwe),
- duże spadki wydajności w momencie wczytywania presetu(wina eksportowania w trybie zgodności Web: brak wsparcia wielowątkowania oraz brak dostępu do warstwy przetwarzania danych na procesorach graficznych).
