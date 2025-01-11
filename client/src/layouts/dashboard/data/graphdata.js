import axios from "axios";

export async function getCategoryWiseexpenseData(year, month, token, setUnauthorized) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/expense-tracker/monthly-expenses-by-category/${year}/${month}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let labels = [];
    let amountData = [];
    response.data.forEach((data) => {
      labels.push(data.category);
      amountData.push(parseFloat(data.total_amount));
    });

    const report_data = {
      labels,
      datasets: { label: "Categories", data: amountData },
    };

    return report_data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 401) {
      setUnauthorized(true);
    }
    return undefined;
  }
}

export async function getCategoryWisecreditData(year, month, token, setUnauthorized) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/expense-tracker/monthly-credits-by-category/${year}/${month}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let labels = [];
    let amountData = [];
    response.data.forEach((data) => {
      labels.push(data.category);
      amountData.push(parseFloat(data.total_amount));
    });

    const report_data = {
      labels,
      datasets: { label: "Categories", data: amountData },
    };

    return report_data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 401) {
      setUnauthorized(true);
    }
    return undefined;
  }
}
