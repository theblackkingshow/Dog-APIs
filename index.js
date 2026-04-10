const API_BASE_URL = 'https://dogapi.dog/api/v2';

const statusEl = document.getElementById('status');
const breedsContainer = document.getElementById('breeds-container');
const breedDetails = document.getElementById('breed-details');
const factContainer = document.getElementById('fact-container');
const groupsContainer = document.getElementById('groups-container');

const loadBreedsBtn = document.getElementById('load-breeds-btn');
const dogFactBtn = document.getElementById('dog-fact-btn');
const loadGroupsBtn = document.getElementById('load-groups-btn');

function setStatus(message, type = '') {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`.trim();
}

function formatRange(rangeObj, suffix = 'years') {
  if (!rangeObj) {
    return 'Unknown';
  }

  const min = rangeObj.min ?? '?';
  const max = rangeObj.max ?? '?';
  return `${min} - ${max} ${suffix}`;
}

async function getJSON(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function fetchBreeds() {
  try {
    setStatus('Loading breeds...');
    breedsContainer.innerHTML = '<p class="loading">Loading breeds...</p>';

    const result = await getJSON('/breeds');
    const breeds = result.data || [];

    if (breeds.length === 0) {
      breedsContainer.innerHTML = '<p>No breeds found.</p>';
      setStatus('No breeds were returned.', 'error');
      return;
    }

    breedsContainer.innerHTML = breeds
      .map((breed) => {
        const attributes = breed.attributes || {};

        return `
          <article class="breed-card">
            <h3>${attributes.name || 'Unknown breed'}</h3>
            <p>${attributes.description || 'No description available.'}</p>
            <p><strong>Hypoallergenic:</strong> ${attributes.hypoallergenic ? 'Yes' : 'No'}</p>
            <p><strong>Life span:</strong> ${formatRange(attributes.life)}</p>
            <p><strong>Male weight:</strong> ${formatRange(attributes.male_weight, 'kg')}</p>
            <p><strong>Female weight:</strong> ${formatRange(attributes.female_weight, 'kg')}</p>
            <button class="small-btn" data-breed-id="${breed.id}">View Details</button>
          </article>
        `;
      })
      .join('');

    setStatus(`Loaded ${breeds.length} dog breeds.`, 'success');
  } catch (error) {
    breedsContainer.innerHTML = '<p>Failed to load breeds. Please try again.</p>';
    setStatus('Failed to load breeds. Please try again.', 'error');
    console.error(error);
  }
}

async function fetchBreedById(id) {
  try {
    setStatus('Loading breed details...');
    breedDetails.innerHTML = '<p class="loading">Loading breed details...</p>';

    const result = await getJSON(`/breeds/${id}`);
    const breed = result.data || {};
    const attributes = breed.attributes || {};
    const groupData = breed.relationships && breed.relationships.group && breed.relationships.group.data;
    const groupId = groupData ? groupData.id : 'Not available';

    breedDetails.innerHTML = `
      <h3>${attributes.name || 'Unknown breed'}</h3>
      <p>${attributes.description || 'No description available.'}</p>
      <p><strong>Hypoallergenic:</strong> ${attributes.hypoallergenic ? 'Yes' : 'No'}</p>
      <p><strong>Life span:</strong> ${formatRange(attributes.life)}</p>
      <p><strong>Male weight:</strong> ${formatRange(attributes.male_weight, 'kg')}</p>
      <p><strong>Female weight:</strong> ${formatRange(attributes.female_weight, 'kg')}</p>
      <p><strong>Group ID:</strong> ${groupId}</p>
    `;

    setStatus(`Showing details for ${attributes.name || 'the selected breed'}.`, 'success');
  } catch (error) {
    breedDetails.innerHTML = '<p>Failed to load breed details. Please try again.</p>';
    setStatus('Failed to load breed details. Please try again.', 'error');
    console.error(error);
  }
}

async function fetchDogFact() {
  try {
    setStatus('Loading dog fact...');
    factContainer.innerHTML = '<p class="loading">Loading dog fact...</p>';

    const result = await getJSON('/facts?limit=1');
    const factData = result.data && result.data[0] && result.data[0].attributes;
    const fact = factData ? factData.body : 'No fact available right now.';

    factContainer.innerHTML = `<p>${fact}</p>`;
    setStatus('Random dog fact loaded.', 'success');
  } catch (error) {
    factContainer.innerHTML = '<p>Failed to load dog facts. Please try again.</p>';
    setStatus('Failed to load dog facts. Please try again.', 'error');
    console.error(error);
  }
}

async function fetchGroups() {
  try {
    setStatus('Loading groups...');
    groupsContainer.innerHTML = '<p class="loading">Loading groups...</p>';

    const result = await getJSON('/groups');
    const groups = result.data || [];

    if (groups.length === 0) {
      groupsContainer.innerHTML = '<p>No groups found.</p>';
      setStatus('No groups were returned.', 'error');
      return;
    }

    groupsContainer.innerHTML = groups
      .map((group) => {
        const breedList = group.relationships && group.relationships.breeds && group.relationships.breeds.data
          ? group.relationships.breeds.data
          : [];
        const breedIds = breedList.length ? breedList.map((breed) => breed.id).join(', ') : 'None listed';

        return `
          <article class="group-card">
            <h3>${group.attributes.name}</h3>
            <p><strong>Related breed IDs:</strong> ${breedIds}</p>
          </article>
        `;
      })
      .join('');

    setStatus(`Loaded ${groups.length} dog groups.`, 'success');
  } catch (error) {
    groupsContainer.innerHTML = '<p>Failed to load groups. Please try again.</p>';
    setStatus('Failed to load groups. Please try again.', 'error');
    console.error(error);
  }
}

loadBreedsBtn.addEventListener('click', fetchBreeds);
dogFactBtn.addEventListener('click', fetchDogFact);
loadGroupsBtn.addEventListener('click', fetchGroups);

breedsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('[data-breed-id]');

  if (!button) {
    return;
  }

  fetchBreedById(button.dataset.breedId);
});

fetchBreeds();
