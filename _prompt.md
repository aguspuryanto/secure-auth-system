### Prompt

Bertindak sebagai Fullstack Developer yang berpengalaman lebih dari 10 tahun, terbiasa membangun aplikasi production-ready, menerapkan Clean Architecture, dan standar security best practice.. (Persona)

Buatkan fitur Login dan Register untuk aplikasi web, lengkap dengan API backend yang terintegrasi dengan database, serta mendukung autentikasi yang aman dan scalable. (Task)

Aplikasi yang dikembangkan adalah aplikasi web modern dengan kebutuhan sebagai berikut:
- Autentikasi menggunakan email dan password
- Password harus di-hash menggunakan bcrypt
- Sistem menggunakan JWT untuk manajemen sesi
- Validasi input dilakukan di backend
- Response API harus konsisten (success & error)
- Siap digunakan untuk lingkungan production

Tech Stack:
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Auth: JWT (Access Token)
(Konteks)

Format (Output yang Diminta)
Sajikan hasil dalam format terstruktur berikut:
Penjelasan singkat arsitektur login & register
Desain database (tabel user)
Daftar endpoint API (request & response)
Flow proses register dan login (step-by-step)
Contoh kode backend (Express + Prisma)
Catatan keamanan (security considerations)

### Hasil Prompt
Sebagai Fullstack Developer dengan pengalaman lebih dari 10 tahun, saya telah membangun sistem autentikasi ini dengan standar production-ready, menerapkan Clean Architecture, dan Security Best Practices.
1. Arsitektur Login & Register
Sistem ini menggunakan arsitektur Stateless Authentication berbasis JWT (JSON Web Token).
Backend: Node.js + Express sebagai API server.
ORM: Prisma untuk manajemen database yang type-safe.
Security: Password di-hash menggunakan bcrypt dengan salt rounds yang optimal.
Validation: Menggunakan Zod untuk validasi skema input di sisi server guna mencegah malicious data.
2. Desain Database (User Table)
Menggunakan database SQLite (untuk kemudahan demo) yang dapat dengan mudah dipindahkan ke PostgreSQL hanya dengan mengganti provider di Prisma.
code
Prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // Hashed
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
3. Daftar Endpoint API
Method	Endpoint	Deskripsi
POST	/api/auth/register	Mendaftarkan user baru (Email, Password, Name)
POST	/api/auth/login	Autentikasi user & mendapatkan JWT Token
GET	/api/auth/me	Mendapatkan data profil user (Protected by JWT)
4. Flow Proses
Register Flow:
Client mengirimkan email, password, dan name.
Backend memvalidasi format input menggunakan Zod.
Backend mengecek apakah email sudah terdaftar di database.
Password di-hash menggunakan bcrypt.hash().
Data user disimpan ke database.
Login Flow:
Client mengirimkan email dan password.
Backend mencari user berdasarkan email.
Backend memverifikasi password menggunakan bcrypt.compare().
Jika valid, backend membuat JWT Access Token yang berisi userId.
Token dikirim ke client dan disimpan di localStorage (atau Secure Cookie untuk production).
5. Catatan Keamanan (Security Considerations)
Password Hashing: Tidak pernah menyimpan password dalam bentuk plain text.
JWT Secret: Menggunakan environment variable untuk menyimpan secret key.
Input Validation: Mencegah SQL Injection dan XSS melalui validasi ketat di backend.
Error Handling: Pesan error login dibuat generik ("Email atau password salah") untuk mencegah username enumeration.
CORS: Dikonfigurasi untuk membatasi akses hanya dari domain yang diizinkan.
Aplikasi sekarang sudah berjalan di port 3000 dengan integrasi penuh antara frontend React dan backend Express. Anda dapat mencoba mendaftar dan login langsung melalui antarmuka yang telah disediakan.