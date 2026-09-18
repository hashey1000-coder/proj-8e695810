export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How accurate are the waiting times shown here?",
    answer:
      "As accurate as the source allows. Trust dashboards with a genuine live feed refresh every few minutes, and we republish their figures exactly as collected on our most recent run — each one carries a timestamp so you can see its age. Where a trust publishes no live feed, we show a clearly labelled estimate of the typical wait, derived from NHS England's monthly performance statistics, and where there's no basis for even that, we show no figure rather than guessing.",
  },
  {
    question: "Where does the data actually come from?",
    answer:
      "Two places: the live waiting-time dashboards that individual NHS trusts run for their own patients (we collect from feeds in England, Scotland and Northern Ireland), and NHS England's monthly performance statistics, which we use to estimate typical waits for English trusts without a live feed. Every hospital page names its source trust and links to the original page. NHS Wales withdrew its live feed, so Welsh hospitals currently show no live figure.",
  },
  {
    question: "Does a short wait mean I'll definitely be seen quickly?",
    answer:
      "No — and this matters. A&E works on triage: a nurse assesses everyone shortly after arrival, and the sickest people go first regardless of the queue. The number on this site reflects the department's overall pace, which is useful for comparing hospitals, but your personal wait depends on how urgent your condition is judged to be and who else walks through the door after you.",
  },
  {
    question: "What's the quietest time to go to A&E?",
    answer:
      "The early morning, roughly 6am to 9am, is reliably the calmest window across the whole week. Demand climbs through the morning, stays high into the evening, and spikes hardest on Monday mornings and on Friday and Saturday nights. If your problem can safely wait a few hours, arriving at breakfast time rather than after dinner often halves the queue around you.",
  },
  {
    question: "Should I go to A&E, or is there a faster option?",
    answer:
      "For anything life-threatening — chest pain, stroke signs, severe bleeding, serious breathing trouble — A&E (or 999) is the only right answer. For sprains, minor cuts, simple fractures, bites and small burns, an Urgent Treatment Centre or Minor Injuries Unit will usually treat you in a fraction of the time. If you're not sure which applies, call 111 first: they'll direct you, and can sometimes book you a timed arrival slot.",
  },
  {
    question: "How do I compare the hospitals near me?",
    answer:
      "Type your postcode into the search box or tap the location icon. You'll get the fifteen closest tracked departments, ordered by distance, with each one's latest queue figure shown alongside — so you can judge whether a slightly longer drive buys you a much shorter wait. The lookup happens once in your browser and we never store your location.",
  },
];
