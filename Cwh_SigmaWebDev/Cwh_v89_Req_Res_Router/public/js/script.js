const allstories = [
  {
    dp: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWwlMjBnaXJsfGVufDB8MXwwfHx8MA%3D%3D",
    stories: "https://images.unsplash.com/photo-1611601679655-7c8bc197f0c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9kZWwlMjBnaXJsfGVufDB8MXwwfHx8MA%3D%3D",
    title: "Title No.1"
  },

  {
    dp: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    stories: "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWwlMjBnaXJsfGVufDB8MXwwfHx8MA%3D%3D",
    title: "Title No.2"
  },

  {
    dp: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    stories: "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWwlMjBnaXJsfGVufDB8MXwwfHx8MA%3D%3D",
    title: "Title No.3"
  },

  {
    dp: "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    stories: "https://images.unsplash.com/photo-1586078130702-d208859b6223?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    title: "Title No.4"
  },

  {
    dp: "https://images.unsplash.com/photo-1611042553484-d61f84d22784?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    stories: "https://images.unsplash.com/photo-1621786030484-4c855eed6974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsJTIwZ2lybHxlbnwwfDF8MHx8fDA%3D",
    title: "Title No.5"
  },

  {
    dp: "https://images.unsplash.com/photo-1625043811738-6da23ad2b469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    stories: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZWwlMjBnaXJsfGVufDB8MXwwfHx8MA%3D%3D",
    title: "Title No.6"
  },

  {
    dp: "https://images.unsplash.com/photo-1649414114329-2f29be9139fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    stories: "https://images.unsplash.com/photo-1613255832515-47e1775b441e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
    title: "Title No.7"
  },

  {
    dp: "https://images.unsplash.com/photo-1615496935364-f6e063d7c229?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    stories: "https://images.unsplash.com/photo-1632587901160-3469ca28eb89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
    title: "Title No.8"
  },

  {
    dp: "https://images.unsplash.com/photo-1621317911081-f123294e86c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    stories: "https://images.unsplash.com/photo-1625043811738-6da23ad2b469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
    title: "Title No.9"
  },

  {
    dp: "https://images.unsplash.com/photo-1622396636133-ba43f812bc35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    stories: "https://images.unsplash.com/photo-1617468505645-fb758702be0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
    title: "Title No.10"
  },
];

const storiesContainer = document.querySelector('.stories-container');
const storyFullView = document.querySelector('.story-fullview');
const storyFullImg = document.querySelector('.story-fullview .content img');
const storyFullTitle = document.querySelector('.story-fullview .title');
const closeBtn = document.querySelector('.close-btn');
const leftArrow = document.querySelector('.story-fullview .content .left-arrow');
const rightArrow = document.querySelector('.story-fullview .content .right-arrow');

let currentIdx = 0;
let timer;

allstories.forEach((e, idx) => {
  const container = document.createElement('div');
  container.classList.add('container');

  const img = document.createElement('img');
  img.setAttribute('src', e.dp);

  container.appendChild(img);
  storiesContainer.appendChild(container);

  container.addEventListener('click', () => {
    currentIdx = idx;
    storyFullView.classList.add('active')
    storyFullImg.setAttribute('src', e.stories)

    if (!e.title) {
      storyFullTitle.style.display = 'none';
    } else {
      storyFullTitle.style.display = 'block';
      storyFullTitle.innerHTML = e.title;
    }

    clearInterval(timer);

    timer = setInterval(() => {
      nextStory();
    }, 3000);

  });
});

closeBtn.addEventListener('click', () => {
  storyFullView.classList.remove('active')
});

leftArrow.addEventListener('click', () => {
  if (currentIdx > 0) {
    currentIdx -= 1;

    storyFullImg.setAttribute('src', allstories[currentIdx].stories);

    if (!allstories[currentIdx].title) {
      storyFullTitle.style.display = 'none';
    } else {
      storyFullTitle.style.display = 'block';
      storyFullTitle.innerHTML = allstories[currentIdx].title;
    }

    clearInterval(timer);

    timer = setInterval(() => {
      nextStory();
    }, 3000);
  }
});

const nextStory = ()=>{
  if (currentIdx < allstories.length - 1) {
    currentIdx += 1;

    storyFullImg.setAttribute('src', allstories[currentIdx].stories);

    if (!allstories[currentIdx].title) {
      storyFullTitle.style.display = 'none';
    } else {
      storyFullTitle.style.display = 'block';
      storyFullTitle.innerHTML = allstories[currentIdx].title;
    }
  }
}

rightArrow.addEventListener('click', () => {
  nextStory();

  clearInterval(timer);

  timer = setInterval(() => {
    nextStory();
  }, 3000);
});