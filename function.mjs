function hitungHarga(hargaPerMeter, luasTanah) {
  // Cek apakah nilainya kosong
  if (hargaPerMeter == null || luasTanah == null) {
    return "⚠️ Masukkan semua angka ya!";
  }

  // Cek apakah nilainya angka dan lebih dari 0
  if (isNaN(hargaPerMeter) || isNaN(luasTanah)) {
    return "🚫 Angka harus valid!";
  }

  if (hargaPerMeter <= 0 || luasTanah <= 0) {
    return "🚫 Harga dan luas harus lebih dari 0!";
  }

  // Kalau semua aman, hitung
  return hargaPerMeter * luasTanah;
}
console.log(hitungHarga(500000, 100));      // ✅ Output: 50000000
console.log(hitungHarga(0, 100));           // 🚫 Harga dan luas harus lebih dari 0!
console.log(hitungHarga(null, 100));        // ⚠️ Masukkan semua angka ya!
console.log(hitungHarga("abc", 100));       // 🚫 Angka harus valid!
