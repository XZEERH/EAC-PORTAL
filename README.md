# 🌌 EAC PORTAL — Command Center

![Version](https://img.shields.io/badge/Version-3.0.0-cyan)
![Status](https://img.shields.io/badge/System-Online-green)
![Security](https://img.shields.io/badge/Encryption-Active-purple)

**EAC Portal** adalah gerbang digital utama bagi **Earth Astronomy Community**. Dirancang dengan estetika *futuristic command center*, portal ini menghubungkan calon angkasa dengan berbagai modul riset, pendaftaran, dan asisten cerdas astronomi secara terpusat.

---

## 🛰️ Fitur Utama

* **Pulsar Radar Interface:** Navigasi visual yang intuitif dengan animasi radar pulsar pada gerbang utama.
* **NASA APOD Integration:** Sinkronisasi otomatis dengan API NASA untuk menyajikan *Astronomy Picture of the Day*.
* **Multi-Module Navigation:** Akses cepat ke 7 sektor utama:
    * Registrasi Sektor 1 & 2.
    * Ruang Ilmu Kappa (Ensiklopedia).
    * Website Resmi EAC.
    * AI Astronomy Assistant.
    * Kalkulator Ilmiah Presisi.
    * Saluran Transmisi WhatsApp.
* **Low-Latency Loading:** Sistem transisi halus sebesar **1.5 detik** dengan animasi atomik ikonik.

---

## 🛠️ Stack Teknologi

Sistem ini dibangun menggunakan arsitektur *lightweight* untuk performa maksimal:
* **Frontend:** HTML5, CSS3 (Modern Flexbox & Animations).
* **Logic:** Vanilla JavaScript (ES6+).
* **API:** NASA Planetary API.
* **Theme:** Deep Space Dark Mode dengan aksen Cyan & Purple.

---

## 🚀 Instalasi & Deployment

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/eac-portal.git](https://github.com/username/eac-portal.git)
    ```
2.  **Konfigurasi API Key**
    Buka file `index.html` dan pastikan API Key NASA Anda terpasang pada fungsi `fetchNasaData`:
    ```javascript
    const apiKey = 'YOUR_NASA_API_KEY';
    ```
3.  **Run Locally**
    Cukup buka file `index.html` di browser pilihan Anda atau gunakan ekstensi *Live Server*.

---

## 📡 Struktur Navigasi

| Sektor | Deskripsi | Tipe Akses |
| :--- | :--- | :--- |
| **Registrasi** | Jalur pendaftaran angkatan baru | Iframe Internal |
| **AI Assistant** | Konsultasi astronomi cerdas | Iframe Internal |
| **Kalkulator** | Perhitungan data riset presisi | Iframe Internal |
| **WhatsApp** | Jalur komunikasi koordinasi | Tab Baru |

---

## 👨‍🚀 Credits

Dibuat dengan penuh dedikasi untuk komunitas astronomi. 
**"Selamat datang calon angkasa!"**

---
© 2026 EAC SYSTEM // ENKRIPSI: AKTIF
