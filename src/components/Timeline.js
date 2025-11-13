export function createTimeline({ items = [], ariaLabel = 'Timeline' }) {
  const timeline = document.createElement('div');
  timeline.className = 'isu-timeline';
  timeline.setAttribute('role', 'list');
  timeline.setAttribute('aria-label', ariaLabel);

  items.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `isu-timeline-item ${item.status || 'pending'}`;
    timelineItem.setAttribute('role', 'listitem');
    
    const statusMap = {
      completed: 'completed',
      active: 'current',
      pending: 'pending'
    };
    timelineItem.setAttribute('aria-current', statusMap[item.status] === 'current' ? 'step' : 'false');

    const marker = document.createElement('div');
    marker.className = 'isu-timeline-marker';
    marker.setAttribute('aria-hidden', 'true');
    timelineItem.appendChild(marker);

    const content = document.createElement('div');
    content.className = 'isu-timeline-content';

    if (item.title) {
      const title = document.createElement('h3');
      title.className = 'isu-timeline-title';
      title.textContent = item.title;
      content.appendChild(title);
    }

    if (item.date) {
      const date = document.createElement('time');
      date.className = 'isu-timeline-date';
      date.textContent = item.date;
      if (item.dateTime) {
        date.setAttribute('datetime', item.dateTime);
      }
      content.appendChild(date);
    }

    if (item.person) {
      const person = document.createElement('div');
      person.className = 'isu-timeline-person';
      person.textContent = item.person;
      person.setAttribute('aria-label', `İşlemi yapan: ${item.person}`);
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

