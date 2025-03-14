function generateOrderID() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `ORDER-${timestamp}-${randomStr}`.toUpperCase();
}

function submitOrder(event) {
    event.preventDefault();
    
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        className: document.querySelector('input[name="class"]').value,
        section: document.querySelector('input[name="section"]').value,
        year: document.querySelector('input[name="year"]').value,
        rollNumber: document.querySelector('input[name="rollNumber"]').value,
        printType: document.querySelector('select[name="printType"]').value,
        pages: parseInt(document.querySelector('input[name="pages"]').value, 10),
    };

    if (formData.pages > 200) {
        alert("The total number of pages cannot exceed 200.");
        return;
    }

    showServerModal(formData);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.order-form').addEventListener('submit', submitOrder);
});

window.addEventListener('scroll', () => {
    const welcomeSection = document.querySelector('.welcome-section');
    const mainContent = document.querySelector('.main-content');
    let scrollPos = window.scrollY;
    
    welcomeSection.style.opacity = 1 - scrollPos / 300;
    
    if (scrollPos > 100) {
        mainContent.classList.add('visible');
    } else {
        mainContent.classList.remove('visible');
    }
});

const servers = [
    { name: "Abhinav Sahu", code: "AA37", number: "919793404007" },
    { name: "Adarsh", code: "AA37", number: "91XXXXXXXXXX" }
];

function showServerModal(formData) {
    const modal = document.getElementById('serverModal');
    modal.style.display = 'flex';
}

function sendWhatsAppMessage(number, formData) {
    const orderID = generateOrderID();
    
    const pricePerPage = {
        bw: 2.5,
        color: 5,
        glossy: 15,
        a4_70gsm: 1
    }[formData.printType];
    
    const totalPrice = (pricePerPage * formData.pages).toFixed(2);

    const message = `*New Print Order* 🖨️\n\n` +
        `*Order ID:* ${orderID}\n` +
        `*Name:* ${formData.name}\n` +
        `*Branch:* ${formData.className}\n` +
        `*Section:* ${formData.section}\n` +
        `*Year:* ${formData.year}\n` +
        `*Roll Number:* ${formData.rollNumber}\n` +
        `*Print Type:* ${formData.printType.toUpperCase()}\n` +
        `*Pages:* ${formData.pages}\n` +
        `*Total Price:* ₹${totalPrice}\n\n` +
        `Please attach file and confirm order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    document.getElementById('serverModal').style.display = 'none';
    alert(`Order ID ${orderID} generated!\nPlease send file via WhatsApp to complete.`);
}

document.addEventListener('DOMContentLoaded', function() {
    // Use event delegation for dynamic elements
    document.body.addEventListener('click', function(e) {
        const btn = e.target.closest('.instructions-btn');
        const container = btn ? btn.closest('.instructions-container') : null;
        
        if (btn) {
            container.classList.toggle('active');
            e.stopPropagation();
        } else {
            document.querySelectorAll('.instructions-container').forEach(c => {
                c.classList.remove('active');
            });
        }
    });
});

function closeServerModal() {
    document.getElementById('serverModal').style.display = 'none';
}

// Close when clicking outside modal
document.getElementById('serverModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('serverModal')) {
        closeServerModal();
    }
});

document.querySelectorAll('.server-item').forEach(item => {
    item.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        const formData = {
            name: document.querySelector('input[name="name"]').value,
            className: document.querySelector('input[name="class"]').value,
            section: document.querySelector('input[name="section"]').value,
            year: document.querySelector('input[name="year"]').value,
            rollNumber: document.querySelector('input[name="rollNumber"]').value,
            printType: document.querySelector('select[name="printType"]').value,
            pages: parseInt(document.querySelector('input[name="pages"]').value, 10),
        };
        sendWhatsAppMessage(number, formData);
    });
});