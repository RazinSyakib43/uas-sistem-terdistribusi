async function fetchBarangData() {
  try {
    const response = await fetch("http://localhost:5000/optik/barang");
    const data = await response.json();
    const selectElement = document.getElementById("id_barang");

    data.data.forEach((barang) => {
      const option = document.createElement("option");
      option.value = barang.id_barang;
      option.text = barang.nama_barang;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Barang data:", error);
    alert("An error occurred while fetching Barang data");
  }
}

async function fetchKaryawanData() {
  try {
    const response = await fetch(
      "http://localhost:5000/perusahaan-a/karyawan/all"
    );
    const data = await response.json();
    const selectElement = document.getElementById("id_karyawan");

    const nullOption = document.createElement("option");
    nullOption.value = ""; 
    nullOption.text = "Select Karyawan";
    selectElement.appendChild(nullOption);

    data.data.forEach((karyawan) => {
      const option = document.createElement("option");
      option.value = karyawan.id_karyawan;
      option.text = karyawan.nama_karyawan;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching Karyawan data:", error);
    alert("An error occurred while fetching Karyawan data");
  }
}

async function submitTransaksi() {
  const id_barang = document.getElementById("id_barang").value;
  const id_karyawan = document.getElementById("id_karyawan").value;
  const nama_pelanggan = document.getElementById("nama_pelanggan").value;
  const jumlah_barang = document.getElementById("jumlah_barang").value;

  try {
    let diskon = 0;
    let namaKaryawan = null;

    if (id_karyawan) {
      const response = await fetch(
        `http://localhost:5000/perusahaan-a/karyawan/${id_karyawan}`
      );
      const karyawanData = await response.json();

      console.log("karyawanData", karyawanData);

      namaKaryawan = karyawanData.nama_karyawan;

      console.log("namaKaryawan", namaKaryawan);

      if (karyawanData) {
        diskon = 0.2;
      }
    }

    const responseTransaksi = await fetch(
      "http://localhost:5000/optik/transaksi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_barang,
          id_karyawan,
          nama_pelanggan,
          jumlah_barang,
        }),
      }
    );

    const dataTransaksi = await responseTransaksi.json();
    console.log(dataTransaksi);

    // Handle success or show an error message
    if (dataTransaksi.status === "Success") {
      alert("Transaksi created successfully");
    } else {
      alert(`Error: ${dataTransaksi.message}`);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("An error occurred while submitting the form");
  }
}

async function fetchTransaksiData() {
  try {
    const response = await fetch("http://localhost:5000/optik/transaksi");
    const data = await response.json();
    const tableBody = document.querySelector("#transaksiTable tbody");

    data.data.forEach((transaksi) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = transaksi.id;
      row.insertCell(1).textContent = transaksi.id_barang;
      row.insertCell(2).textContent = transaksi.id_karyawan;
      row.insertCell(3).textContent = transaksi.nama_karyawan;
      row.insertCell(4).textContent = transaksi.jumlah_barang;
      row.insertCell(5).textContent = transaksi.total_harga;
      row.insertCell(6).textContent = transaksi.diskon;
      row.insertCell(7).textContent = transaksi.total_bayar;
      row.insertCell(8).textContent = transaksi.createdAt;
      row.insertCell(9).textContent = transaksi.updatedAt;
    });
  } catch (error) {
    console.error("Error fetching Transaksi data:", error);
    alert("An error occurred while fetching Transaksi data");
  }
}

window.onload = function () {
  fetchBarangData();
  fetchKaryawanData();
  fetchTransaksiData();
};
