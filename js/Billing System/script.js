function addItem() {
    document.getElementById("items").insertAdjacentHTML("beforeend", `
        <div class="item row g-2 align-items-center">
            <div class="col-md-4"><input type="text" placeholder="Item Name" class="form-control item-name"></div>
            <div class="col-md-3"><input type="number" placeholder="Price" class="form-control price" oninput="calculateBill()"></div>
            <div class="col-md-3"><input type="number" placeholder="Qty" class="form-control quantity" value="1" oninput="calculateBill()"></div>
            <div class="col-md-2 text-center"><button class="btn btn-danger remove-btn" onclick="removeItem(this)"><i class="fas fa-trash"></i></button></div>
        </div>
    `);
}

function removeItem(button) {
    button.parentElement.parentElement.remove();
    calculateBill();
}

function calculateBill() {
    let total = 0, summaryHTML = "";
    document.querySelectorAll(".item").forEach((item, index) => {
        let name = item.querySelector(".item-name").value || `Item ${index + 1}`;
        let price = parseFloat(item.querySelector(".price").value) || 0; 
        let qty = parseInt(item.querySelector(".quantity").value) || 1;
        let itemTotal = price * qty;
        total += itemTotal;
        summaryHTML += `<p>${name}: $${price} x ${qty} = $${itemTotal.toFixed(2)}</p>`;
    });

    let discount = parseFloat(document.getElementById("discount").value) || 0;
    let tax = parseFloat(document.getElementById("tax").value) || 0;
    total = total - (total * discount / 100) + (total * tax / 100);

    let totalAmount = document.getElementById("totalAmount");
    totalAmount.innerText = total.toFixed(2);

    // Flash effect for total amount
    totalAmount.classList.add("flash");
    setTimeout(() => totalAmount.classList.remove("flash"), 5000);

    // Bill summary
    document.getElementById("bill-summary").innerHTML = summaryHTML;

    // Show confirmation message
    let message = document.getElementById("confirmation-message");
    message.innerText = "Bill Calculated Successfully!";
    message.style.opacity = "1";
    setTimeout(() => { message.style.opacity = "0"; }, 2000);
}

function payBill() {
    let total = parseFloat(document.getElementById("totalAmount").innerText);
    if (total > 0) {
        alert(`✅ Payment of $${total} successful!`);
        clearAll();
    } else {
        alert("⚠ No items to pay for!");
    }
}

function clearAll() {
    document.getElementById("items").innerHTML = "";
    document.getElementById("discount").value = "";
    document.getElementById("tax").value = "10";
    document.getElementById("totalAmount").innerText = "0.00";
    document.getElementById("bill-summary").innerHTML = "";
}
