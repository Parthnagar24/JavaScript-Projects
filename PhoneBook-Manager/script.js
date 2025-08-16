let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

// Capitalize each word
function capitalizeEachWord(str) {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Validate phone number
function isValidPhone(phone) {
    return /^\d{7,15}$/.test(phone); // 7 to 15 digits
}

// Save to localStorage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Display contacts
function displayContacts(list = contacts) {
    const container = document.getElementById('contactsList');
    container.innerHTML = '';
    list.forEach((c, index) => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <span>${c.name}: ${c.phone}</span>
            <div>
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Add contact
function addContact() {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const name = capitalizeEachWord(nameInput.value.trim());
    const phone = phoneInput.value.trim();

    if (!name || !phone) return alert('Enter both name and phone');
    if (!isValidPhone(phone)) return alert('Enter a valid phone number (7-15 digits)');
    if (contacts.some(c => c.name === name)) return alert('Contact already exists');

    contacts.push({name, phone});
    saveContacts();
    displayContacts();
    nameInput.value = '';
    phoneInput.value = '';
}

// Delete contact
function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
}

// Suggest matches
function suggestMatches() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(query) || c.phone.includes(query)
    );
    displayContacts(filtered);
}

// Edit modal functions
function openEditModal(index) {
    editIndex = index;
    document.getElementById('editName').value = contacts[index].name;
    document.getElementById('editPhone').value = contacts[index].phone;
    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    const newName = capitalizeEachWord(document.getElementById('editName').value.trim());
    const newPhone = document.getElementById('editPhone').value.trim();

    if (!newName || !newPhone) return alert('Enter both name and phone');
    if (!isValidPhone(newPhone)) return alert('Enter a valid phone number (7-15 digits)');
    if (contacts.some((c, i) => c.name === newName && i !== editIndex)) {
        return alert('Contact with this name already exists');
    }

    contacts[editIndex] = {name: newName, phone: newPhone};
    saveContacts();
    displayContacts();
    closeModal();
}

// Display on load
displayContacts();
