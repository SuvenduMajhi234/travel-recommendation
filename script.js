const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('results-container');

function searchRecommendations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    resultsContainer.innerHTML = ''; 

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let foundData = [];

            if (input.includes('beach')) {
                foundData = data.beaches;
            } else if (input.includes('temple')) {
                foundData = data.temples;
            } else {
                // দেশ অনুযায়ী সার্চ
                const country = data.countries.find(c => c.name.toLowerCase().includes(input));
                if (country) {
                    foundData = country.cities;
                }
            }

            if (foundData.length > 0) {
                foundData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'result-card';
                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <button style="margin: 0 15px 15px; padding: 8px 15px; background:#2c3e50; color:white; border:none; border-radius:4px; cursor:pointer;">Visit</button>
                    `;
                    resultsContainer.appendChild(card);
                });
                // সার্চ রেজাল্টে স্ক্রল করা
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                resultsContainer.innerHTML = '<p style="color:red; font-weight:bold;">No matching results found. Try "beach", "temple", or "australia".</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

searchBtn.addEventListener('click', searchRecommendations);

clearBtn.addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    resultsContainer.innerHTML = '';
});

// কন্টাক্ট ফর্ম সাবমিশন অ্যালার্ট
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    e.target.reset();
});
