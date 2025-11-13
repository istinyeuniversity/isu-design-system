export function createTimeline({ items = [] }) {
  const timeline = document.createElement('div');
  timeline.className = 'isu-timeline';

  items.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `isu-timeline-item ${item.status || 'pending'}`;

    const marker = document.createElement('div');
    marker.className = 'isu-timeline-marker';
    timelineItem.appendChild(marker);

    const content = document.createElement('div');
    content.className = 'isu-timeline-content';

    if (item.title) {
      const title = document.createElement('div');
      title.className = 'isu-timeline-title';
      title.textContent = item.title;
      content.appendChild(title);
    }

    if (item.date) {
      const date = document.createElement('div');
      date.className = 'isu-timeline-date';
      date.textContent = item.date;
      content.appendChild(date);
    }

    if (item.person) {
      const person = document.createElement('div');
      person.className = 'isu-timeline-person';
      person.textContent = item.person;
      content.appendChild(person);
    }

    if (item.note) {
      const note = document.createElement('div');
      note.className = 'isu-timeline-note';
      note.textContent = item.note;
      content.appendChild(note);
    }

    timelineItem.appendChild(content);
    timeline.appendChild(timelineItem);
  });

  return timeline;
}

