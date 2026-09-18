export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  lastReviewed: string;
  content: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "ae-vs-urgent-care",
    title: "Two Front Doors: Deciding Between A&E and Urgent Care",
    description: "How to work out, in under a minute, whether your problem belongs in an emergency department or a local urgent treatment centre.",
    category: "Getting the Right Care",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## The one-minute test

Before you grab your keys, ask yourself a single question: **could this problem cost someone their life, their sight, or the use of a limb if it is not treated within the hour?**

If the honest answer is yes — or even "possibly" — you belong in A&E, and depending on how serious things look, you may need to [ring 999](/guides/calling-999/) rather than travel yourself. If the answer is no, but the problem still needs a clinician today, an urgent treatment centre will usually get to you far faster, in a calmer setting, and with everything it needs to sort you out.

That single question does most of the work. The rest of this guide fills in the detail for the situations where the answer is genuinely unclear.

## What an urgent treatment centre actually offers

Urgent treatment centres — you may also see the older names minor injuries unit, walk-in centre or urgent care centre on local signage — sit between your GP surgery and the hospital emergency department. They are typically run by experienced nurse practitioners and GPs, open at least twelve hours a day, and equipped for the everyday accidents and infections that make up a huge share of NHS urgent care.

A typical centre can:

- Take X-rays and read them on site
- Close wounds with stitches, skin glue or adhesive strips
- Put a suspected simple fracture in a cast or splint
- Treat sprains, pulled muscles and minor sports injuries
- Assess and treat ear, throat, urine and skin infections, and prescribe antibiotics where needed
- Remove grit or an eyelash from the surface of the eye
- Dress and manage smaller burns that do not involve the face, hands or joints

Picture the kind of day that ends at a UTC: you come off your bike and your wrist is swollen and sore but looks straight; your toddler splits her lip on the coffee table and the cut clearly needs glue; you have had a burning, urgent need to wee since yesterday and it is getting worse. None of those needs an emergency department — and all of them will usually be dealt with at a UTC in a fraction of the time.

## What a UTC cannot do

Knowing the ceiling matters as much as knowing the menu. Urgent treatment centres generally do **not** have:

- CT or MRI scanners — imaging is limited to X-ray
- Operating theatres or surgeons on site
- Beds for admitting patients overnight
- Blood transfusion facilities or intensive monitoring
- Specialist mental health crisis teams
- Cover for the very youngest children at every site — some centres set a minimum age, so ring ahead with a baby or young toddler

If staff at a UTC realise your problem is bigger than their toolkit, they will not simply send you away. They arrange your transfer, phone the receiving emergency department, and pass on everything they have already recorded — so the assessment they have done still counts towards your care.

## When only A&E will do

Some presentations should never go anywhere other than an emergency department, because they may need resuscitation, urgent scanning, surgery or specialist teams within minutes:

- **Crushing, heavy or spreading chest pain**, especially with sweating, nausea or breathlessness — see our [chest pain guide](/guides/chest-pain-advice/)
- **Possible stroke** — use FAST: has the **F**ace dropped on one side? Can they raise both **A**rms? Is **S**peech slurred or strange? If any answer worries you, it is **T**ime to call 999
- **Struggling to breathe** — unable to finish a sentence, lips turning blue, noisy laboured breathing
- **Bleeding that soaks through dressings** despite firm, continuous pressure
- **A seizure that will not stop**, or someone who cannot be roused afterwards
- **Anaphylaxis** — throat swelling, wheeze or collapse after food, medication or a sting: call 999 straight away, use an adrenaline auto-injector (EpiPen or Jext) immediately if one is prescribed, and lie the person flat while you wait — never bundle them into a car
- **Serious injury** — falls from height, road collisions, wounds where bone is visible, head injuries with confusion or vomiting
- **An overdose or poisoning**, whatever the substance and however it happened

In every one of these, do not drive yourself if there is any chance of collapsing at the wheel. An ambulance crew starts treatment on the journey and radios ahead so the hospital is ready.

## The grey areas

Real life rarely arranges itself into neat lists. A few common in-between situations:

- **A limb injury that might be broken.** If the limb looks bent, the skin is broken over the injury, or the pain is unbearable, choose A&E. If it is swollen and painful but roughly normal in shape, a UTC with X-ray is usually the quicker route — our guide to [broken bones and sprains](/guides/broken-bones-and-sprains/) walks through the signs.
- **Abdominal pain.** Severe, constant pain — especially with fever, vomiting or a rigid tummy — needs A&E. Grumbling discomfort that comes and goes is better assessed by 111 or your GP first.
- **A bumped head.** Brief dazedness with full recovery and no vomiting can often be watched at home or checked at a UTC; loss of consciousness, repeated vomiting, worsening headache or confusion means A&E. Our [head injuries guide](/guides/head-injuries/) sets out the red flags.

When you genuinely cannot decide, [NHS 111](/guides/using-nhs-111/) exists precisely for this moment. An assessment over the phone or online takes a few minutes, and in many areas 111 can book you a timed arrival at the service it recommends.

## Does the choice really change your wait?

Considerably. Emergency departments prioritise by clinical urgency, so a minor injury in A&E sits behind every ambulance arrival and every deteriorating patient. The same injury at a UTC competes only with other minor cases. On a busy evening that difference is routinely measured in hours, not minutes. You can see the gap for yourself by [comparing live waits near you](/near-me/) before setting off — and if timing is flexible, our guide to [the quietest times to visit](/guides/quietest-times-to-visit/) can shave off even more.

There is a wider benefit too: every minor case treated at a UTC is one fewer person in the emergency queue, which keeps A&E moving for the patients whose lives depend on it.

## Finding your local options

Naming is inconsistent across the country, so search by service rather than by label. Our [hospital directory](/hospitals/) lists emergency departments and urgent care sites together, with each one's type marked, and you can browse [by region](/regions/) to compare what is open near you. Check opening hours before travelling at night — many UTCs close between roughly 10 pm and 8 am, when your options narrow to A&E or 111.

## Key takeaways

- Life, limb or sight at risk: **A&E**, and 999 if travel is unsafe.
- Injuries and infections that need treating today but are not dangerous: **a UTC**, usually far faster.
- UTCs can X-ray, stitch and plaster; they cannot scan, operate or admit you.
- Turning up at the "wrong" one costs time, not safety — staff will redirect or transfer you.
- Undecided? Contact **[111](/guides/using-nhs-111/)** first and let the assessment choose for you.
`,
  },
  {
    slug: "cut-your-ae-wait",
    title: "How to Spend Less Time Waiting in A&E",
    description: "The choices and small preparations — before you leave and after you arrive — that genuinely shorten an emergency visit.",
    category: "Practical Advice",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## Three decisions control most of your wait

People imagine their A&E wait is decided by luck. Mostly it is decided by three choices made before they even leave the house: **which service** they go to, **which department** they pick, and **when** they arrive. Get those right and everything else is fine-tuning.

### Decision one: is A&E even the right service?

Nothing shortens an A&E wait like not needing one. A surprising range of problems is handled faster elsewhere:

1. **A pharmacist** can assess and treat many minor ailments on the spot — rashes, hay fever, mild ear discomfort, coughs and colds, simple urine infections in women — and can now supply prescription treatment for several common conditions.
2. **Your GP surgery** holds urgent same-day slots at most practices; phoning at opening time is often quicker than half a day in a waiting room.
3. **An urgent treatment centre** covers cuts, sprains, suspected simple fractures and infections — usually at half the wait or better. Our guide to [choosing between A&E and urgent care](/guides/ae-vs-urgent-care/) makes the call easy.
4. **[NHS 111](/guides/using-nhs-111/)** will assess anything you are unsure about and, in many areas, book you a timed slot at whichever service fits.

If your situation is a genuine emergency, skip this step entirely — go, or call 999. The rest of this guide assumes A&E is the right destination.

### Decision two: which A&E?

Departments a short drive apart can be having completely different evenings. One may be absorbing a run of ambulances while its neighbour is ticking along quietly. Because the number that matters is your **total** time — travel plus waiting — a twenty-minute longer journey to a department running two hours lighter is an easy win. Check the [live picture near you](/near-me/) before choosing, or browse the [full hospital list](/hospitals/) if you are somewhere unfamiliar.

### Decision three: when do you set off?

If the problem is stable enough to give you any say in timing, use it. The quietest stretch in nearly every department is the **early morning, roughly 6 am to 9 am**; the worst are Monday mornings, weekday evenings and weekend nights. A sore wrist that has been iced and rested overnight will usually be X-rayed and strapped far quicker at 7 am than at 8 pm. The full weekly pattern is in our [timing guide](/guides/quietest-times-to-visit/).

## Five minutes of packing that pays for itself

The single most useful thing you can carry into A&E is an accurate answer to the question every clinician asks first: *what medication do you take?* Photograph your medicine boxes or write a list — names, doses, how often. Add:

- Any allergies, and what actually happens when you are exposed
- A one-line history of major illnesses and operations
- Your NHS number if you can find it quickly (it is on prescriptions and NHS letters)
- A phone charger, water, and something to eat and to do

Our [packing checklist](/guides/ae-packing-checklist/) has the complete list, including extras for children and older relatives.

## Working with the system once you arrive

### Give triage a headline, not a biography

The nurse who first assesses you needs the essentials fast: what is wrong, when it began, how it has changed, and anything relevant such as heart disease or blood thinners. A crisp answer helps them place you in the correct priority band — which is what actually determines your wait. Save the fuller story for the treating clinician. If you want to understand the banding itself, read [how triage works](/guides/how-triage-works/).

### Never sit on a deterioration

Triage decisions are based on how you were **at that moment**. If new symptoms appear while you wait — chest tightness, worsening pain, vomiting, faintness, a spreading rash — go straight back to the desk and say so. You will be reassessed, and your priority can rise. Staff cannot spot a change from across a crowded room; telling them is not making a fuss, it is giving them clinical information.

### Stay where you can be found

Let reception know before you nip to the toilet, the car or the coffee machine. Being absent when your name is called does not send you to the back of the whole queue, but it does cost you your slot with that clinician, and the delay can be substantial.

### Understand that A&E is several queues, not one

Registration, triage, clinician, tests, results, decision — each stage has its own wait, and a cubicle sitting empty between stages does not mean you have been forgotten. Knowing this in advance defuses most of the frustration. Our walkthrough of [a full A&E visit](/guides/your-first-ae-visit/) explains what each pause is for.

### Ask for updates the effective way

After a long silent stretch it is entirely reasonable to ask. A specific question — "are my blood results back yet?" or "roughly how many people are ahead of me in my category?" — gets a more useful answer than "how much longer?". Ask politely, and know that you are entitled to pain relief while you wait; our guide to [your rights in A&E](/guides/your-rights-in-ae/) covers what you can expect.

### Put the waiting time to work

Jot down a timeline of your symptoms, the questions you want answered, and anything you have already tried. Patients who hand a clinician an organised story tend to get through assessment faster — and forget fewer questions they meant to ask.

## Leave with everything you need

A rushed exit is a false economy: unclear instructions are a leading cause of avoidable return visits. Before you go, be sure you can answer four things — what the diagnosis (or working diagnosis) is, what to do at home, which warning signs mean coming straight back, and what follow-up has been arranged. Our guide to [what happens after your visit](/guides/after-your-ae-visit/) picks up from there.

## The short version

- Right **service**, right **department**, right **time** — those three choices beat every other trick combined.
- Carry a medication list; it is the question you will definitely be asked.
- Report any worsening immediately; triage can be redone.
- Expect several short queues rather than one long one, and keep yourself findable.
- Five minutes with [111](/guides/using-nhs-111/) and a glance at [live waits](/near-me/) before leaving home can save you hours.
`,
  },
  {
    slug: "your-first-ae-visit",
    title: "Inside A&E: The Whole Visit, Explained in Order",
    description: "Each stage of an emergency department visit — who you meet, what they do, and why the process pauses between steps.",
    category: "How A&E Works",
    readTime: "8 min read",
    lastReviewed: "September 2026",
    content: `
## Why A&E feels confusing — and why it is not

An emergency department is not one queue; it is a series of short processes with waits in between, and nobody hands you a map at the door. Once you can see the shape of it — check in, triage, wait, assessment, tests, decision — the visit stops feeling random and starts feeling like a system you can navigate. This guide walks through it in order.

Bringing a child? Read our [parents' guide](/guides/taking-a-child-to-ae/) alongside this one. Supporting an elderly relative? Our [older adults guide](/guides/older-adults-in-ae/) covers the extra considerations.

## Checking in

Walk-in patients start at the reception desk. The receptionist is not judging whether you deserve to be there — they are opening your record. Expect to give:

- Name, date of birth and address
- A contact number and your GP practice
- One sentence on what has brought you in

Your NHS number helps but is never required, and you cannot be refused emergency care for lacking ID or documents. Arriving by ambulance skips this desk entirely: the crew hands you and their observations straight to the clinical team.

## Triage: the sorting step

Soon after check-in — the aim is within about fifteen minutes — an experienced nurse calls you through for triage. In a few focused minutes they will:

1. Record your observations: pulse, blood pressure, temperature, breathing rate and oxygen level via a painless finger clip
2. Ask exactly what happened and how things have changed since
3. Check medications, allergies and relevant history
4. Assign you a clinical priority category

That category — not your arrival time — decides when you are seen. A patient who walks in an hour after you but is sicker will rightly go first. It works in your favour too: deteriorate, and you move up. The full system is explained in [how triage works](/guides/how-triage-works/).

One request from every triage nurse in the country: be straight about your symptoms. Toughing it out can land you in too low a band; embellishing invites tests you do not need. Accurate is fastest.

## The main wait

Now comes the part everyone dreads: the waiting room. Three things make it more bearable.

**Know what the wait depends on.** Your category, the number of patients in it ahead of you, and how many clinicians are on. None of that is visible from your chair, which is why the wait can *feel* arbitrary when it is not. If you are curious what the published figures for your hospital actually measure, see [how waits are measured](/guides/how-waits-are-measured/) — or check the [live picture](/hospitals/) at departments near you.

**Speak up if anything changes.** New or worsening symptoms mean walking back to the desk and saying so, straight away. Triage is a snapshot, and it can and should be retaken.

**You can have someone with you,** and you can step out briefly — just tell reception first so you are findable when called.

## Seeing the clinician

Your name is called by a doctor, an advanced nurse practitioner or a physician associate, and you move to a cubicle or assessment room. This conversation is longer and deeper than triage:

- The full story of the current problem, minute by minute where it matters
- Past medical history, operations and family history
- Every medication and its dose — this is where a prepared list, as our [packing checklist](/guides/ae-packing-checklist/) suggests, earns its keep
- Your home situation: stairs, support, whether you can cope if discharged

Then a physical examination, and often the first treatment — pain relief, a dressing, a splint, fluids — before any test results are back.

## Tests, and the waiting they bring

Most investigations in A&E fall into a handful of types, each with its own rhythm:

- **ECG** — a heart tracing, done in minutes at the bedside with an immediate result
- **Blood tests** — samples go to the hospital lab; most panels return in about an hour, some sooner, a few later
- **X-ray** — a short trip to radiology; the image is reviewed soon after
- **CT or MRI** — reserved for specific concerns such as stroke or significant head injury; arranging, scanning and formal reporting all add time
- **Urine and swab tests** — quick dip results in minutes, full laboratory cultures long after you have gone home

This is the stage where visits stretch, and where it most often feels like nothing is happening. Something is: your results are queued for review, and you may be moved back to a waiting area so your cubicle can be used meanwhile. Being moved is workflow, not abandonment.

## The decision

With the picture assembled, the visit resolves in one of four directions:

**Home.** The most common outcome by far. You should leave holding four things: what the team thinks is wrong, what to do about it, which symptoms mean coming back, and what follow-up is booked or recommended. If any of the four is missing, ask before you leave. Our guide to [after your visit](/guides/after-your-ae-visit/) covers the days that follow.

**A specialist opinion.** Sometimes an in-house team — orthopaedics, cardiology, surgery, mental health liaison — is asked to see you in the department before anything is decided. Worth knowing: this often adds a wait, because that specialist is usually also covering the wards.

**Admission.** If you need ongoing treatment or observation, the team requests a bed. When the hospital is full this handover can be slow, and you may wait in the department for a ward place.

**Transfer.** Occasionally the service you need — a burns unit, specialist children's care — is at another hospital, and an ambulance transfer is arranged with your notes sent ahead.

## How long, honestly?

The NHS four-hour standard asks that the great majority of patients be admitted, transferred or discharged within four hours of arrival — the current operational target is 78 per cent, though the NHS Constitution's underlying standard remains 95 per cent. Reality varies with pressure: straightforward discharges commonly take two to four hours end to end, while patients being admitted often spend considerably longer waiting for a bed. Time of day and season move the needle a great deal, which is why checking [live waits](/near-me/) and picking your moment, where clinically safe, genuinely matters.

## Throughout it all

You keep the same rights at every stage: to understand what is proposed, to consent or decline, to pain relief, to an interpreter, and to raise concerns with the nurse in charge. The detail is in [your rights in A&E](/guides/your-rights-in-ae/).

## In summary

- A&E is a sequence — check-in, triage, wait, assessment, tests, decision — with a queue at each step.
- Your triage category, set by clinical need, controls your wait; arrival order does not.
- Report any change in your condition immediately; the snapshot can be retaken.
- Pauses after tests are results being processed, not you being forgotten.
- Do not leave without the diagnosis, the plan, the warning signs and the follow-up.
`,
  },
  {
    slug: "quietest-times-to-visit",
    title: "The Quiet Hours: Picking Your Moment for A&E",
    description: "When emergency departments empty out and when they fill up — and how to use the pattern without taking risks.",
    category: "Timing Your Visit",
    readTime: "6 min read",
    lastReviewed: "September 2026",
    content: `
## First, the safety rule

Timing advice applies **only** when a condition is stable and safe to sit on. Anything life-threatening — or anything getting worse — goes to hospital now, whatever the clock says, with [999](/guides/calling-999/) if travel is unsafe. Everything below is for the middle ground: the injury or illness that needs a clinician today-ish, where a few hours' flexibility is clinically harmless.

## The golden window: early morning

Across almost every emergency department in the country, the slackest hours are **roughly 6 am to 9 am**. The night's arrivals have been worked through, and the day's have not begun. A patient who walks in at 7 am is often assessed, X-rayed and home before the person who arrived at 9 pm the previous evening would have reached a cubicle.

This window suits a familiar scenario perfectly: an ankle turned during an evening run, iced and elevated overnight with painkillers, brought in first thing for an X-ray. Same treatment, hours less waiting — and no clinical downside, provided the injury was safe to observe overnight (our [broken bones and sprains guide](/guides/broken-bones-and-sprains/) covers when it is not).

Two secondary dips are worth knowing: a modest lull in the **mid-afternoon**, between the lunchtime arrivals and the after-work rush, and the general quietness of **Tuesday to Thursday** compared with the rest of the week. Combine them and you get the sweet spot of the entire weekly cycle: **a midweek morning before 9 am**.

## The crush points

The busy periods are just as predictable, because they follow the rhythms of ordinary life.

### The Monday surge

Monday is reliably the heaviest day of the week. The logic is simple arithmetic: two days of closed GP surgeries and reduced pharmacy hours mean two days of problems arriving together when the week begins. The backlog takes most of Monday to clear. If your problem has waited since Saturday, it may be quicker to phone your GP at 8 am Monday than to join the A&E queue — or to wait for Tuesday morning if it is safe to.

### The after-work wave

On weekdays, arrivals climb steeply from about **5 pm** and stay high until **10 pm or later**. This is the hour of the school-day injury finally brought in, the niggle that got worse at a desk, the parent home from work finding a feverish child. It is consistently one of the slowest times to be a minor case in a major department.

### Weekend nights

**Friday and Saturday from mid-evening into the small hours** bring the week's most difficult waiting rooms — alcohol-related injury concentrates here, especially at city-centre hospitals, and the atmosphere can be noisy and occasionally tense. If your problem can wait until Sunday morning instead, Sunday morning is a different world.

### Holidays

Bank holidays behave like compressed weekends: everything else is shut, so A&E absorbs the lot. Christmas Day itself is, perhaps surprisingly, one of the quieter days for attendances — but the days immediately after it, along with New Year's Eve and New Year's Day, rank among the busiest of the year as the backlog arrives all at once. Expect long waits on any public holiday, at any hour except early morning.

## The seasonal tilt

Underneath the weekly cycle runs an annual one:

- **December to February** is peak pressure: flu and chest infections, norovirus, falls on ice, and holiday closures stacking on top of each other. In deep winter the early-morning window is not just the best time — it is sometimes the only predictably calm one.
- **June to August** runs lighter overall, though heatwaves, sports injuries and holiday-area surges (coastal hospitals in particular) create local spikes.
- **Spring and autumn** sit in between, with Easter producing a brief bank-holiday bump and late autumn marking the start of respiratory season.

## Averages are not your hospital, tonight

Every pattern above is a national tendency, and any single department on any single evening can defy it. A road incident, a run of ambulances or simple staffing gaps can turn a normally quiet Tuesday into a hard night — and vice versa. Local character matters too: a hospital by a football ground, a seaside town in August, a student city in freshers' week all bend the curve.

So use the pattern to plan, and use live data to decide. [Check current waits near you](/near-me/) before travelling, and if you want to understand exactly what those published figures do and do not capture, our guide to [how waits are measured](/guides/how-waits-are-measured/) explains. Longer-term trends for every trust are on our [statistics page](/statistics/).

## A simple decision framework

1. **Dangerous or deteriorating?** Go now. Timing is irrelevant.
2. **Needs today, currently stable?** Prefer the next early-morning window; avoid 5–10 pm and weekend nights.
3. **Could a UTC handle it?** Then the whole question softens — urgent treatment centres feel the rush far less than A&E does. See [A&E vs urgent care](/guides/ae-vs-urgent-care/).
4. **Not sure it needs hospital at all?** Let [111](/guides/using-nhs-111/) assess it; in many areas they can book you a timed arrival, which beats guessing.

## Remember

- Best bet nationwide: **before 9 am, Tuesday to Thursday**.
- Worst bets: Monday daytime, weekday evenings, Friday and Saturday nights, and every bank holiday.
- Winter amplifies everything; the morning lull becomes even more valuable.
- Patterns predict; [live numbers](/near-me/) decide.
- And none of this ever applies to an emergency — those go straight in, always.
`,
  },
  {
    slug: "using-nhs-111",
    title: "Making NHS 111 Work for You",
    description: "What the 111 service can actually do — assessments, bookings and redirections — and how to get the most from a call or online check.",
    category: "Getting the Right Care",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## The NHS's front desk

Think of NHS 111 as the health service's front desk: a free, always-open service whose whole job is matching your symptoms to the right care, first time. It runs **24 hours a day, every day of the year**, and reaching it costs nothing:

- **Phone 111** from any mobile or landline — free even with no call credit
- **Go to 111.nhs.uk** and answer the questions online (England)
- **Use the NHS App**, which offers the same online assessment

One boundary before anything else: 111 is for urgent problems, not emergencies. Someone collapsed, not breathing properly, showing stroke signs or bleeding heavily needs **999** — our [999 guide](/guides/calling-999/) draws the line clearly. For everything urgent-but-not-critical, 111 is usually the smartest first move you can make.

## Phone or online?

Both routes run the same clinical questioning; they suit different people and situations.

**Choose the website or app when** you can describe things in writing, you would rather avoid a call queue (which can be long in winter and on holidays), or it is 3 am and you want to work through it quietly. You also get a record of the assessment to show whoever treats you.

**Choose the phone when** the situation is tangled, you are ringing about somebody else — a feverish child, a confused parent — you need a human voice, or typing is hard right now. Phone advisors can also escalate you mid-call to a nurse or paramedic clinician when the script is not enough.

## What actually happens when you contact 111

The process has three beats, whichever route you take.

**You describe the problem.** Structured questions establish what is wrong, where, since when, how severe, and what you have tried. The questioning follows NHS Pathways — the same clinical decision system used by many 999 call handlers — so the questions can feel oddly specific. Answer them literally; each one rules something in or out.

**The system weighs the answers.** Phone advisors are trained handlers following the clinical algorithm, not making personal judgements. When a case does not fit the pathways neatly, it goes to a clinician on the team. You can also ask to speak to a clinician if you feel the questions are missing the point — that is a legitimate request, not a nuisance.

**You get a destination.** The possible outcomes span the whole system:

- **Look after it at home**, with specific advice and clear instructions on when to call back
- **See a pharmacist** — for a growing list of conditions pharmacists can assess and supply treatment directly
- **A booked GP appointment**, including evening and weekend hubs — often arranged faster than you could get through to your own surgery
- **Go to an urgent treatment centre or A&E** — with, in many areas, a **timed arrival slot booked for you**
- **An ambulance**, dispatched directly if your answers reveal an emergency — you will not be told to hang up and redial
- **Urgent dental or mental health services**, where those pathways exist locally — for a crisis, see our [mental health emergencies guide](/guides/mental-health-emergencies/)

## The booking trick most people miss

The single most underused feature of 111 is the **booked arrival**. Where a hospital or UTC supports it, 111 can reserve you a time slot, which means the service is expecting you, your assessment details arrive before you do, and you are not simply joining the back of a walk-in queue at the worst hour of the evening.

Even without a bookable slot, arriving with a 111 reference means the front desk can see a clinical assessment already exists. Pair the 111 advice with a look at [live waits near you](/near-me/) and you can pick the least-loaded of your local options rather than defaulting to the closest — the difference is often hours. If it turns out A&E is not needed at all, our [A&E vs urgent care guide](/guides/ae-vs-urgent-care/) shows why that redirection is usually the biggest time-saver of all.

## Honest limitations

111 is genuinely useful, and it has edges worth knowing:

- **It errs on the side of caution — by design.** An algorithm that cannot see you must assume the worse possibility when answers are ambiguous. Occasionally that means an A&E recommendation a doctor in the room would not have made. If a recommendation seems disproportionate, ask for the clinician call-back rather than ignoring the advice.
- **It cannot look at you.** Rashes, lumps, swelling and wounds sometimes simply need eyes on them, and no phone assessment replaces that.
- **It does not itself prescribe.** It connects you to services that can — out-of-hours GPs, pharmacists with prescribing schemes — but what exists varies by area.
- **Queues happen.** Winter evenings and bank holidays stretch phone waits; the online route sidesteps the queue entirely.

## Using 111 for someone else

Calling on behalf of another person is completely normal and often the right thing to do. You will answer questions about what you can observe: their breathing, their colour, their alertness, what they have taken. Parents should note that the pathways include age-specific questions for babies and children — have their age (in months, for little ones), their temperature if you have measured it, and any medicines given ready. Our [guide for parents](/guides/taking-a-child-to-ae/) covers the signs in children that should send you straight past 111 to emergency care.

The same applies for elderly relatives, neighbours you are worried about, or a friend who is unwell but reluctant — you can make the call and put the advisor's questions to them, or answer from what you see.

## Out of hours, 111 is the hub

Evenings, nights, weekends and holidays are precisely when 111 matters most, because it holds the map of what is actually open: the overnight pharmacy, the weekend GP hub, the urgent dental slot, the UTC that closed at ten versus the one running until midnight. Rather than guessing at closed doors, one call gives you the live picture. Our guide to [overnight and weekend care](/guides/overnight-and-weekend-care/) covers the full out-of-hours landscape.

## The takeaway

- 111 is free, always open, and reachable by phone, web or app.
- It assesses, then routes: self-care, pharmacy, GP booking, UTC or A&E slot, or ambulance if needed.
- Booked arrival slots and pre-shared assessments are the hidden time-savers — ask about them.
- Cautious recommendations are a feature; a clinician call-back is yours to request.
- Clear emergency signs skip 111 entirely: that is what [999](/guides/calling-999/) is for.
`,
  },
  {
    slug: "taking-a-child-to-ae",
    title: "When Your Child Needs A&E: A Parent's Guide",
    description: "Recognising which childhood illnesses and injuries need the emergency department, and getting through the visit with less stress for both of you.",
    category: "Children & Older Adults",
    readTime: "8 min read",
    lastReviewed: "September 2026",
    content: `
## Trust the child, not just the thermometer

The hardest part of parenting a sick child is judging severity, and the most reliable guide is simpler than most parents expect: **watch the child, not the number**. A little one at 39.2°C who is still demanding snacks, watching cartoons and grumbling at you is generally far less worrying than one at 38.3°C who is limp, silent, refusing drinks and hard to interest in anything. Behaviour, breathing, drinking and alertness tell you more than any single reading.

That principle sits underneath every specific rule below.

## Straight to A&E — or 999 — for these

Some presentations in children are never a wait-and-see:

- **Laboured breathing.** Ribs or the notch of the neck sucking in with each breath, grunting, flared nostrils, breathing too hard to feed or talk — and in small babies, the head bobbing in time with breaths.
- **A rash that stays put under glass.** Press the side of a clear tumbler firmly over the spots: if you can still see them through the glass, treat it as suspected meningococcal disease and call **999**.
- **Floppiness or unrousability.** A child who is unusually limp, cannot be properly woken, or drifts off mid-interaction.
- **A fit** — any first seizure, or one lasting beyond five minutes.
- **Any fever in a baby under three months.** A temperature of 38°C or more in the first twelve weeks always needs same-day medical assessment.
- **A swallowed button battery or magnets.** Batteries burn through tissue within hours; multiple magnets can trap bowel between them. Both are genuine emergencies even if the child seems fine.
- **A significant head injury** — knocked out, vomiting afterwards, increasingly drowsy or confused, or a fall from above head height. The full red-flag list is in our [head injuries guide](/guides/head-injuries/).
- **Serious burns** — anything involving the face, hands, feet, genitals or a joint, anything blistering larger than the child's own palm, and any notable burn in a baby. First aid and thresholds are in our [burns and scalds guide](/guides/burns-and-scalds/).
- **An obviously deformed limb** or a child in severe pain that proper doses of paracetamol or ibuprofen do not touch.

## What can usually wait — or go elsewhere

Most childhood illness never needs a hospital. Colds, coughs and sore throats in a child who is drinking and alert; short-lived tummy bugs; grazes, bumped shins and small cuts you can clean and close at home; mild fevers responding to rest, fluids and age-appropriate medicine — these are pharmacy, GP or home territory.

For injuries in between — a limping ankle, a wrist they will not use after a fall, a cut that gapes — an **urgent treatment centre** usually has everything needed, including X-ray, with a far shorter and calmer wait than A&E; our [broken bones and sprains guide](/guides/broken-bones-and-sprains/) helps you judge. And whenever you are torn, [NHS 111](/guides/using-nhs-111/) has dedicated children's pathways and will happily assess a child based on what you describe. No decent clinician anywhere will criticise a parent for checking.

## What a children's A&E visit looks like

### A different environment

Many hospitals run a separate paediatric emergency area — softer decor, toys, child-height equipment, staff who spend their days with children. Where there is no separate unit, children are still assessed using child-specific charts and seen by staff trained in paediatrics.

### Triage speaks a different language for children

Normal heart rate, breathing rate and blood pressure all shift with age — figures alarming in an adult can be routine in a two-year-old. Triage nurses assess against age-banded charts, which is why they will ask a baby's age in **months** and the child's rough **weight** (it sets medicine doses). Bring both to mind on the way in. How the priority system then works is covered in [how triage works](/guides/how-triage-works/).

### You are part of the clinical team

Nobody knows this child's normal like you do. "She's just not herself" is real clinical information — say it. Stay with your child throughout, answer for them where they cannot, and comfort them during procedures; a calm parent on the trolley is worth more than any distraction technique the staff have. For pain, staff use child-friendly tools — pointing at faces on a chart, or simply reading behaviour in pre-verbal children — so describe what you have noticed: clutching an ear, refusing to stand, crying when picked up.

### One crucial honesty: medicines already given

Tell staff exactly what medicine the child has had today, what dose, and when — including anything given in the car park. Doses of paracetamol and ibuprofen stack, and staff must know what is already on board before giving more. Bring the bottle if you can.

## Packing for a visit with a child

Children's visits run long, and hospital vending machines do not stock patience. On top of the basics in our [packing checklist](/guides/ae-packing-checklist/):

- Spare nappies, wipes and a full change of clothes — illness is messy
- Their comfort object, whatever it is; it makes examinations dramatically easier
- Feeds for babies: your formula, your bottles
- Quiet snacks and a drink for older children
- A charged device with entertainment **downloaded in advance** — assume no usable WiFi
- The little red book (child health record) if you have it, plus any recent hospital or clinic letters

If two adults can come, split the jobs: one holds and comforts, the other registers, fetches and phones.

## Three illness patterns worth recognising

**The barking cough.** A cough like a seal, often worse at night, sometimes with a harsh noise on breathing in, is typically croup. Mild croup is managed at home with calm and comfort; noisy breathing at rest, working hard to breathe, or blueness needs emergency assessment.

**The wheezy baby.** Bronchiolitis, common in winter infants, starts like a cold then moves to the chest — wheeze, fast breathing, struggling with feeds. Taking much less milk than usual, drier nappies, or effortful breathing are the signals to seek help the same day.

**The vomiting child.** Most vomiting is a short-lived bug; the danger is dehydration. Offer small sips often. No wet nappy for many hours, a dry mouth, no tears, or unusual drowsiness moves this from home care to medical review. Green (bile-stained) vomit needs urgent assessment.

## Afterwards: the safety net matters more with children

Children change fast — in both directions. Before leaving, make sure you know precisely which changes should bring you back, and never feel awkward about returning: a re-attendance with a child who has worsened is exactly what emergency departments want you to do. If new symptoms appear after you get home, that is a fresh assessment, not a repeat of the old one.

## Quick recap

- Judge by behaviour, breathing and drinking — not the thermometer alone.
- Glass test failure, breathing distress, floppiness, first fits, under-three-month fevers, button batteries: emergency care, no hesitation.
- Middling injuries often mean a UTC; uncertainty means [111](/guides/using-nhs-111/).
- Know age in months and rough weight; declare every dose of medicine already given.
- Pack for a long stay, keep yourself calm for their sake, and [check live waits](/near-me/) if more than one suitable department is in range.
`,
  },
  {
    slug: "mental-health-emergencies",
    title: "Mental Health Emergencies: Getting Urgent Help That Fits",
    description: "Where to turn in a psychiatric crisis — what A&E can and cannot offer, the alternatives that may serve you better, and how to support someone else.",
    category: "How A&E Works",
    readTime: "8 min read",
    lastReviewed: "September 2026",
    content: `
## If you need help right now

Keep these three to hand before reading anything else:

- **999** — if you or someone else is in immediate danger: an overdose has been taken, serious self-harm has happened or is about to, or someone cannot be kept safe.
- **NHS 111, selecting the mental health option** — free, 24 hours a day, connecting you to local crisis support and advice. Our [111 guide](/guides/using-nhs-111/) explains how the service works.
- **Samaritans on 116 123** — free from any phone, day and night, every day, for anyone who needs to talk. You can also text **SHOUT to 85258** to reach a trained volunteer by message.

None of these requires you to be at any particular level of "bad enough". If you are frightened by where your mind is, that is reason enough.

## A mental health crisis is an emergency — full stop

The health system treats a psychiatric emergency as exactly that: an emergency. Feeling unable to keep yourself safe, acting on thoughts of ending your life, self-harm that needs medical attention, losing contact with reality — hearing or seeing things others cannot, or beliefs that are driving dangerous behaviour — all of these entitle you to urgent care in the same way a broken leg would. Walking into A&E in psychological crisis is a legitimate use of the emergency department, and staff there will not see it any other way.

That said, A&E is not always the *best-suited* place — and knowing the full menu of options can get you better help, faster.

## What actually happens if you go to A&E

### Booking in and triage

You register like any other patient; you do not need to perform distress or find perfect words. Something as simple as "I'm having a mental health crisis and I don't feel safe" tells the triage nurse what they need. They will assess your physical state — essential if anything has been taken or any injury exists — and your mental state, and assign a priority like any other patient; [how triage works](/guides/how-triage-works/) explains the system. Be fully honest about substances, medication doses and self-harm: it is treated as clinical information, never as a confession, and hiding it can make treatment slower or genuinely dangerous.

If waiting feels unsafe — if being alone with your thoughts in a public room is part of the danger — **say exactly that at triage**. Departments can arrange regular check-ins, a staff-visible seat, or a quieter side room where one exists.

### Body first, then mind

Where there is a physical element — an overdose, wounds, intoxication — the physical treatment comes first: monitoring, blood tests, wound care, antidotes where they exist. This ordering can feel like your distress is being sidelined. It is not; it is the necessary foundation, because a psychiatric assessment cannot help you if your body is in danger.

### The liaison psychiatry assessment

Once you are physically safe, the hospital's mental health liaison team — psychiatric nurses, with psychiatrist input — sits down with you properly: what led to this point, your history, what support exists around you, and what would genuinely help. Be as honest as you can manage, including about the hardest parts; the assessment shapes everything that follows.

Overnight and at weekends this team is often stretched across a whole hospital, and the wait can be long. Asking for an update is reasonable; so is asking for somewhere quieter to wait.

### Where it leads

- **Home, supported by the crisis team** — this is what happens most often: the community crisis service picks you up, usually within a day, with a short-term plan to steady things.
- **Voluntary admission** — a stay on a mental health ward, agreed with you, where a period of safety and stabilisation is needed.
- **Onward referral** — back to your GP, into community mental health services, or into talking-therapy support once the immediate crisis is easing.
- **A Mental Health Act assessment** — only where someone's own health or safety, or other people's safety, is judged seriously at risk and they will not accept help; it requires two doctors and an approved mental health professional, with legal safeguards throughout. You retain rights at every stage — our guide to [your rights in A&E](/guides/your-rights-in-ae/) covers them.

## The alternatives that may fit better

An emergency department is bright, loud, crowded and slow — a hard environment for a mind in crisis. If you are safe enough to choose, consider:

**Your existing crisis number.** Anyone already under mental health services should have a crisis line in their care plan — it connects to people who can see your history, and is nearly always a better first call than a walk-in.

**The 111 mental health option.** In most of the country this now routes directly to a crisis-trained clinician who can arrange urgent local support without a hospital in sight.

**Crisis cafés and safe havens.** A growing number of areas run evening and weekend walk-in spaces — calm, non-clinical, staffed by mental health workers — designed for exactly the moment when home feels unsafe but hospital feels wrong. Your local NHS trust's website or 111 can tell you what exists near you.

**Samaritans, around the clock.** Not a clinical service — a listening one, on 116 123 — and for many people, an hour of being heard is what turns the worst night around.

If A&E is the right call after all, [checking live waits](/near-me/) lets you choose the calmer of two nearby departments — a small decision that can matter a great deal in crisis.

## Standing beside someone else's crisis

If it is not you but someone you love:

1. **Stay.** Presence is protection. Do not leave someone alone who cannot keep themselves safe.
2. **Listen more than you fix.** You are not required to have answers; you are required to be there.
3. **Quietly reduce risk** — move medicines, blades and alcohol out of easy reach where you can do it without confrontation.
4. **Offer to make the call together** — 111, Samaritans, their crisis team. Dialling alongside someone is easier than being told to dial.
5. **If they are in immediate danger and refusing help, call 999 anyway.** Consent is not required to save a life, and making that call is an act of care, not betrayal.

In the department, stay if they want you there. Your account of recent days — what they said, how they have changed, what has been happening — may be the most valuable information the assessment team receives.

## Making the visit itself more survivable

Small preparations blunt the environment's edges: headphones and something familiar to listen to; a written note of what is happening if speaking feels impossible — handing the triage nurse a few lines on your phone works perfectly well; a trusted person beside you; your crisis plan, if you have one, which tells staff what helps and what harms. And afterwards, engage with whatever follow-up is offered even if the crisis has passed by morning — the days after an emergency visit are exactly when the next chapter is decided, as our guide to [after your A&E visit](/guides/after-your-ae-visit/) explains. If the care you received fell short, you are entitled to say so: our [complaints and feedback guide](/guides/complaints-and-feedback/) shows how, and speaking up improves the service for the next person in crisis.

## Hold on to this

- Immediate danger: **999**. Urgent support: **111, mental health option**. Someone to talk to, any hour: **Samaritans, 116 123** (or text SHOUT to 85258).
- A mental health crisis is a real emergency, and A&E will take it seriously — physical safety is treated first, then a specialist team assesses properly.
- Crisis lines, safe havens and crisis teams often help faster and more gently than a hospital waiting room, when it is safe to use them.
- Tell triage if waiting feels unsafe; ask for the quiet room; write it down if you cannot say it.
- Whatever tonight looks like, crisis care exists precisely for this — reaching for it is the strong move, not the weak one.
`,
  },
{
    slug: "how-triage-works",
    title: "Triage: The Invisible Queue That Runs Every A&E",
    description: "Where you sit in the waiting room and where you sit in the queue are two different things. Here is how nurses decide who gets called next.",
    category: "How A&E Works",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## Two queues, not one

Picture a Saturday evening waiting room. A man with a bandaged hand has been sitting near the vending machine for two hours. A woman walks in, speaks briefly to a nurse, and is taken through within ten minutes. To the man with the hand injury, this looks like queue-jumping. It is not — it is triage doing exactly what it is meant to do.

Every A&E runs two queues at once. There is the visible one — the order people walked through the door — and the clinical one, which ranks patients by how urgently they need a doctor. Only the second queue decides who gets called. The woman who went straight through almost certainly had something time-critical: perhaps chest pain, perhaps stroke symptoms. The bandaged hand, uncomfortable as it is, can safely wait.

Once you understand this, an A&E visit becomes far less baffling. This guide walks through what happens at the triage desk, what the categories mean, and what you can do to make sure the nurse has an accurate picture of you.

## Your first few minutes: the triage assessment

Shortly after you book in — the aim in most departments is within a quarter of an hour — a nurse with specialist emergency training will call you through for a short assessment. This is not your main consultation. Its single purpose is to work out how urgent your problem is.

Expect three things to happen.

### A set of observations

The nurse records the numbers that reveal how your body is coping:

- Pulse and blood pressure
- Breathing rate — often counted quietly while you talk
- Temperature
- Oxygen levels, via a painless clip on a fingertip
- A finger-prick glucose reading, if diabetes could be part of the picture

These feed into an early-warning score. Readings well outside the normal range push you up the priority list; a completely normal set is reassuring, even when you feel dreadful.

### A short, focused history

You will be asked when the problem started, whether it is improving or worsening, how bad any pain is out of ten, what you have already tried, what medicines you take, and whether you have allergies or relevant conditions. The questions are deliberately brisk — the nurse is filling in a risk picture, not writing your life story.

### A quick look

The nurse may glance at a wound, press gently on a swollen ankle, or listen to your chest. A fuller examination comes later, from the clinician who treats you.

## The five levels of urgency

The majority of UK emergency departments sort patients using the Manchester Triage System, which places everyone into one of five bands. Each band carries a target time for medical review.

1. **Immediate (red)** — no wait at all. Cardiac arrest, patients who are not breathing adequately, catastrophic bleeding, deep unconsciousness. These patients bypass the waiting room entirely and go to the resuscitation area.
2. **Very urgent (orange)** — target of ten minutes. Suspected heart attacks, stroke symptoms within the treatment window, serious breathing difficulty, major burns, victims of high-speed collisions.
3. **Urgent (yellow)** — target of one hour. Think of a person with severe abdominal pain and a racing pulse, a suspected broken thigh bone, or someone in acute mental health crisis. On a busy shift this is the biggest group.
4. **Standard (green)** — target of two hours. Stable injuries and illnesses that still need hospital-level care: a wrist that is probably broken but looks straight, a cut that needs closing, tummy pain with normal observations.
5. **Non-urgent (blue)** — target of four hours. Problems that a pharmacy, GP or urgent treatment centre could usually sort: minor grazes, an unchanged long-term symptom, a rash with no fever. If this is you, it is genuinely worth asking whether an [urgent treatment centre](/guides/ae-vs-urgent-care/) or a call to [NHS 111](/guides/using-nhs-111/) would get you help sooner.

Within a band, people are broadly seen in order of arrival — but anyone placed in a higher band goes ahead of everyone below. On a rough night, a steady flow of ambulances can hold the green and blue queues almost still for hours. Frustrating, yes. Unfair, no.

## The category is not a life sentence

Triage is a snapshot, and bodies change. If your pain climbs, you become breathless, you feel faint, or anything new appears while you wait, go back to the desk and say so plainly. Nurses can and do re-assess people, and being moved up a band on re-triage is routine, not a favour. Suffering in silence helps nobody — least of all you.

The reverse also happens: someone whose observations settle after early treatment may effectively drop in priority. That, too, is the system working.

## What else stretches the wait

Even two people in the same band can have very different visits. The other moving parts include:

- **How full the department is** — both your band and every band above you
- **Who is on shift** — staffing thins overnight and thickens at handover times
- **Whether the wards have space** — when admitted patients cannot move on, everything behind them slows
- **Which specialists you need** — waiting for the on-call orthopaedic or psychiatric team adds its own queue
- **The scanner and lab workload** — one CT scanner serves the whole hospital

For what the published numbers do and do not capture, see [how waits are measured](/guides/how-waits-are-measured/), and for tactics that genuinely shorten a visit, read [cutting your A&E wait](/guides/cut-your-ae-wait/).

## Helping the nurse get it right

You cannot pick your own category, but you can make sure it is based on good information:

- **Tell it straight.** Neither minimise ("it's probably nothing") nor inflate. The nurse needs the real picture.
- **Lead with the history that matters.** Chest pain plus a previous heart attack changes everything — say it in the first sentence.
- **Hand over a medicines list.** What you take shapes what could be wrong with you; our [packing checklist](/guides/ae-packing-checklist/) explains the easiest ways to carry one.
- **Ask which band you are in.** You are entitled to know, and it helps you plan the hours ahead.
- **Bring a second pair of ears** if you can — someone who knows your normal self is a powerful witness.

## When triage looks different

**Children** are scored against age-specific charts, because a toddler's normal heart rate would alarm anyone reading an adult chart. Knowing your child's age in months and rough weight speeds things up — more in our [guide to taking a child to A&E](/guides/taking-a-child-to-ae/).

**Older people** often show illness sideways: a chest infection appears as a fall, sepsis appears as new muddle. If you are with an older relative, describe the change from their usual self — "on Tuesday she was doing the crossword, today she can't find the kitchen" tells the nurse more than any single reading. Our [older adults guide](/guides/older-adults-in-ae/) goes deeper.

**Mental health crises** are ranked with the same urgency framework, weighted towards physical risk — an overdose is treated as high priority, while severe distress without physical danger may be banded lower. That can feel cold; it is not a judgement on how much you are suffering. See our [mental health emergencies guide](/guides/mental-health-emergencies/).

## The short version

- A&E calls patients by clinical urgency, never by arrival time.
- A brief nursing assessment — observations, questions, a quick look — places you in one of five bands with targets from immediately to four hours.
- Your band can change: report any worsening straight away.
- Honest, specific information and a medicines list are your best tools at the desk.
- Placed in the lowest band? A [nearby alternative service](/near-me/) may treat you far faster than the bottom of the A&E queue.
`,
  },
  {
    slug: "calling-999",
    title: "Is This a 999 Moment? How to Decide in Seconds",
    description: "The situations where dialling 999 is unambiguously right, the ones where it isn't, and what unfolds between your call and the hospital doors.",
    category: "Getting the Right Care",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## One question to ask yourself

Strip away the uncertainty and 999 comes down to a single question: **could this person die or be permanently harmed if help does not come fast?** If the honest answer is yes — or even "possibly" — dial. Ambulance services would far rather assess a call that turns out to be minor than learn that someone sat on a heart attack for an hour out of politeness.

If the answer is clearly no, there are quicker, better-suited routes: [NHS 111](/guides/using-nhs-111/), a pharmacy, an [urgent treatment centre](/guides/ae-vs-urgent-care/), or making your own way to A&E. This guide sets out where the line falls.

## Situations where you should always dial

### The heart: chest pain that feels wrong

A heart attack rarely looks like the films. More often it is a heavy, tight or squeezing sensation in the middle of the chest that will not ease — sometimes creeping into the arm, jaw, neck or back, sometimes arriving with clamminess, nausea or breathlessness. Ring 999 straight away for pain like this, especially in anyone with known heart trouble. While the crew is on its way, sit the person down and, unless they are allergic, let them slowly chew one 300 mg aspirin. For the wider picture of chest pain — including the causes that are not emergencies — see our [chest pain guide](/guides/chest-pain-advice/).

### The brain: any sign of stroke

Stroke treatment is a race against the clock, and hospitals can only win it if you start it. Run through the FAST check: a drooping **face**, an **arm** that drifts down when raised, **speech** that is slurred or scrambled — any one of these means it is **time** to call 999, even if the symptoms fade. Never drive a suspected stroke patient yourself; the ambulance crew warns the stroke unit ahead of arrival so the team is standing ready.

### The lungs: breathing that is failing

Ring 999 when someone cannot get a full sentence out between breaths, when lips or fingertips turn bluish or grey, when the neck and belly muscles are visibly heaving with each breath, when an asthma reliever inhaler has stopped working despite repeated puffs, or when breathing has stopped altogether.

### Bleeding you cannot stop

Blood that pumps or spurts, bleeding that soaks through firm pressure after ten minutes, deep wounds to the neck, chest or belly, or a casualty turning pale, cold and confused — all are 999 calls. Press hard on the wound with the cleanest fabric to hand and keep pressing; if it soaks through, pile more on top rather than lifting it off.

### Collapse and seizures

Someone who will not rouse to voice or a firm shoulder squeeze needs an ambulance, as does a seizure that runs past five minutes or repeats before the person comes round. Unconsciousness after a blow to the head is always an emergency — our [head injuries guide](/guides/head-injuries/) covers the milder end of that spectrum too.

### Anaphylaxis

A severe allergic reaction announces itself with a swelling tongue or throat, difficulty swallowing or breathing, widespread hives, and light-headedness or collapse. Use the person's adrenaline pen the moment you suspect it, then call 999 regardless of whether they seem to improve — reactions can rebound.

### Overdose and poisoning

Any deliberate or accidental overdose, any child who has swallowed medicines, cleaning products or button batteries, anyone drowsy, vomiting or confused after taking a substance: call. Some poisons bide their time and early "fine-ness" proves nothing. Never try to induce vomiting.

### Serious trauma

High-speed road collisions, falls from height, stabbings, crush injuries, near-drownings — mechanisms like these justify an ambulance even before you can tell how badly hurt anyone is.

## Where 999 is the wrong tool

None of the following needs an ambulance, however unpleasant it feels in the moment:

- A limping ankle or a wrist that might be broken but looks normal — travel by car to a [UTC or A&E](/guides/ae-vs-urgent-care/)
- Fever in an adult who is awake, talking sense and keeping fluids down
- Small burns away from the face, hands, feet and groin
- Raging toothache — 111 can find an emergency dentist
- A long-standing condition grumbling along without a dangerous change
- Emotional crisis without immediate physical danger — a crisis line, 111 option 2, or Samaritans on 116 123 will reach you sooner; see our [mental health emergencies guide](/guides/mental-health-emergencies/)

Calling 999 for these does not get you seen faster. Ambulance arrivals are triaged like everyone else, and a non-urgent problem still lands at the back of the clinical queue.

## From dial tone to hospital

**On the phone.** A call handler works through a fixed script — is the patient breathing, are they conscious, what happened, where exactly are you. Answer plainly and stay on the line: handlers talk callers through CPR, bleeding control and the recovery position every single shift, and those minutes of coached first aid save lives.

**While you wait.** Unlock the door and put lights on. Send someone to the kerb to wave the crew down if the address is awkward. Shut pets away. Scoop the patient's medicine boxes into a bag if you have a spare pair of hands. Give nothing to eat or drink unless the handler says otherwise — chewed aspirin for a suspected heart attack being the notable exception.

**On scene.** Paramedics carry much of a small emergency department with them: monitors, oxygen, drugs, a defibrillator. They may treat and transport, treat and safely leave the person at home — more common than people assume — or call in extra help such as an air ambulance.

**At the hospital.** An ambulance patient is handed over clinician-to-clinician and enters the department by the clinical back door, not the waiting room. Priority still depends on condition, not on the mode of arrival.

## Two things worth doing today

**Teach the children.** Even a four-year-old can learn the pattern: press 999, say your name and address, say "someone won't wake up", stay on the phone. Households where a parent lives with epilepsy, diabetes or heart disease should rehearse it like a fire drill.

**Learn your local options.** Knowing in advance where your nearest [open department](/near-me/) and urgent treatment centre are removes one decision from a frightening moment.

## Key takeaways

- Dial 999 for suspected heart attack or stroke, failing breathing, unstoppable bleeding, unconsciousness, long seizures, anaphylaxis, overdose and major trauma.
- Genuinely unsure? Call anyway — assessment over the phone is the handler's job, and no one is scolded for good faith.
- Confident it is urgent but not life-threatening? [111](/guides/using-nhs-111/) will route you faster than an ambulance would.
- Follow the handler's coaching while you wait; it is treatment, not small talk.
- Ambulance arrival does not skip triage — the sickest are seen first however they arrive.
`,
  },
  {
    slug: "how-waits-are-measured",
    title: "Reading the Wait-Time Figures Like an Insider",
    description: "The number on a hospital dashboard is not a promise about your visit. Learn what clocks the NHS runs, and how to turn the data into good decisions.",
    category: "How A&E Works",
    readTime: "6 min read",
    lastReviewed: "September 2026",
    content: `
## A number is only useful if you know what it counts

"Current wait: 2 hrs 40." You will see figures like this on this site and on hospital screens across the country. Before you act on one, it pays to know what the clock behind it is actually timing — because different hospitals time different things, and none of them is timing *you specifically*.

Used well, the numbers are a genuinely powerful tool for choosing where and when to go. Used naively, they set up expectations that the evening will cheerfully demolish. This guide gives you the insider's reading.

## The clocks hospitals run

### Door to departure

The headline NHS measure is the **total time a patient spends in the department** — the stopwatch starts when you register and stops when you leave, whether that means walking out with advice, being wheeled to a ward, or transferring to another hospital. Everything in between counts: triage, sitting, assessment, blood tests, the wait for results, treatment, and the final decision.

This is the clock behind the famous **four-hour standard**. Under current planning guidance the NHS expects 78 per cent of attendances to conclude — by admission, transfer home, or discharge — inside four hours; the NHS Constitution's original bar was 95 per cent, and the interim figure is revisited each planning year. Note what that is — a system-wide performance benchmark, not an entitlement stamped on your ticket. Some patients are in and out in ninety minutes; others, especially those needing a scarce ward bed or a specialist opinion, legitimately run past four hours.

### Door to first clinician

Some trusts publish a different figure: **how long until a doctor or practitioner first assesses you**. This clock stops much earlier, so its numbers look smaller. A board reading "50 minutes to be seen" and a board reading "3 hours in department" might describe two equally busy hospitals — they are simply timing different legs of the same journey.

### Which one you are looking at

We republish whatever each trust makes public, labelled by source, without adjustment or modelling. Because trusts choose their own metric, the figures are not always like-for-like — one reason we flag the source on every listing in our [hospital directory](/hospitals/).

## Where the data comes from

Inside every emergency department, an electronic tracking board follows each patient from check-in to check-out. The software rolls those individual journeys into a live aggregate — typically a recent average or median — and some trusts push that aggregate to a public webpage or feed.

We poll those public sources on a regular cycle, usually every 15 to 30 minutes, and stamp each reading with its age. A figure refreshed ten minutes ago deserves your trust; one from four hours ago is history, not news, and we mark it as such. Not every trust publishes live data at all — coverage depends entirely on what hospitals choose to share.

## Three good uses for the number

1. **Ranking your options.** This is the killer application. If one department near you reads 90 minutes and another reads 240, the first is the calmer building right now — full stop. Our [near-me page](/near-me/) does this ranking for you.
2. **Spotting the direction of travel.** A figure that has crept upward all afternoon describes a department filling faster than it empties; one falling since the small hours describes a department clearing its backlog. Arriving into a falling trend is one of the simplest wins available — our [quietest times guide](/guides/quietest-times-to-visit/) maps the weekly rhythm.
3. **Setting expectations.** A 300-minute reading tells you to charge your phone, warn whoever is expecting you home, and pack accordingly.

## Three traps to avoid

### Treating it as your personal ETA

The figure blends every patient in the building. Your own journey depends overwhelmingly on your [triage band](/guides/how-triage-works/): someone with stroke symptoms will beat the average by hours, while someone with a splinter may double it. The number describes the department's weather, not your itinerary.

### Panicking when it rises after you arrive

Three ambulances pulling in with seriously ill patients will push the published figure up — but they have not taken your place in the queue, because they were always going to be seen before the minor-injury bands. A rising figure means the department is absorbing more work, not that you have been demoted.

### Comparing without checking travel time and metric

A hospital 45 minutes away showing half the wait of the one ten minutes away may offer no real saving once the drive is added — and if the two trusts publish different clocks, the comparison may be meaningless anyway. Always add drive time, and check what each figure measures.

## A five-step routine before you set off

1. Open the [live comparison](/near-me/) and shortlist the two or three nearest departments.
2. Discard any reading more than an hour old.
3. Add realistic door-to-door travel time to each wait figure.
4. Glance at the trend — rising, flat or falling.
5. Ask whether A&E is even the right building: for many green-band problems, an [urgent treatment centre](/guides/ae-vs-urgent-care/) beats every A&E on your list.

Five minutes of this routine routinely saves hours of sitting.

## The bigger picture behind the numbers

Performance against the four-hour standard swings with the seasons — winter respiratory surges stretch every department — and with the calendar, as Monday mornings absorb the weekend's postponed problems. It also varies sharply from one region to another; our [statistics section](/statistics/) and [regional pages](/regions/) let you see how your local trusts have been performing over months, not minutes. That longer view is useful context: a department that "always shows four hours" is not broken, just consistently busy, and knowing that changes how you plan rather than whether you go.

## Key takeaways

- Wait figures time either the whole visit or the wait for first assessment — check which before comparing hospitals.
- The four-hour standard (an operational target of 78 per cent admitted, transferred or discharged within four hours) is a system benchmark, never a personal guarantee.
- The single best use of live data is comparison: [rank nearby departments](/near-me/), add travel time, favour fresh readings and falling trends.
- Your triage band moves your personal wait far more than the headline number does.
- For a shorter visit overall, pair the live data with our [wait-cutting tactics](/guides/cut-your-ae-wait/).
`,
  },
  {
    slug: "your-rights-in-ae",
    title: "What You're Entitled to in A&E — and How to Ask for It",
    description: "Consent, interpreters, privacy, your notes, a second opinion: the entitlements every emergency patient holds, with practical scripts for using them.",
    category: "Your Rights",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## Rights don't stop at the ambulance bay

It is easy to feel powerless in an emergency department — you are unwell, the environment is loud, and everyone else seems to know the rules. But the NHS Constitution follows you through those doors. The entitlements it sets out are not customer-service aspirations; they are formal commitments — many of them backed by legislation — that apply in A&E as much as in any clinic.

Knowing your rights changes how a visit feels. You ask better questions, you spot when something is going wrong, and you know exactly which lever to pull if it does. This guide covers the rights that matter most in an emergency setting, with plain suggestions for how to use each one.

## To understand what is happening to you

You are entitled to explanations in words you can follow — the suspected diagnosis (even a provisional one), what each test is for, what the treatment options are with their risks, and what the plan is next. Medicine has its own dialect; you are allowed to interrupt it. A useful script: *"Can you tell me that again without the jargon?"* No good clinician minds.

If English is not your strongest language, ask for an interpreter — hospitals can connect to telephone interpreting in dozens of languages around the clock, and you should never be pushed into using a relative, least of all a child, to translate medical details. Deaf patients can request a BSL interpreter or written communication. Patients with a learning disability are entitled to extra time and accessible formats.

You are also entitled to a progress update. If hours pass in silence, walking to the desk and asking calmly "can someone tell me where I am in the queue and what happens next?" is entirely reasonable — knowing your [triage band](/guides/how-triage-works/) helps you judge whether the wait you are experiencing is normal.

## To say yes — and to say no

Nothing is done to a competent adult without agreement. For everyday A&E care — examinations, bloods, X-rays, stitches — a verbal yes is enough, given after a proper explanation. Bigger interventions, such as procedures under sedation, come with a form to read and sign; take your time with it and ask about anything unclear.

The mirror-image right matters just as much: **you can decline any test or treatment**, even one the doctors strongly recommend. They must spell out the consequences, but they cannot override a competent adult's refusal. Turning down one thing does not forfeit the rest of your care, and if you choose to leave altogether you will usually be asked to sign a self-discharge form — after which the door remains open if you think better of it at 3 am.

Three special cases:

- **When someone cannot decide.** An unconscious or severely confused patient can be treated in their best interests under the Mental Capacity Act 2005. Crucially, the law starts from the assumption that people *do* have capacity — age, dementia or a psychiatric diagnosis alone never remove it.
- **Children and teenagers.** Sixteen- and seventeen-year-olds consent for themselves. Under-16s usually need a parent or guardian, though a young person who genuinely grasps the decision can consent in their own right (the Gillick principle). More in our [guide for parents](/guides/taking-a-child-to-ae/).
- **Mental health law.** In defined circumstances the Mental Health Act allows treatment of a mental disorder without consent — the one true exception, explained further in our [mental health emergencies guide](/guides/mental-health-emergencies/).

## To be treated as a person, not a case number

Dignity is a right, not a courtesy. Concretely, that means examinations behind a curtain or in a room, a covering when undressed, your chosen name and pronouns, respect for religious and cultural needs — including asking for a same-sex clinician for intimate examinations — and not being discussed over your head as though you had already left. Pressured departments sometimes slip; when they do, a quiet word with the nurse in charge is the fastest fix, and asking for them is itself your right.

## To keep your business private

What you tell clinicians stays within your care team, with narrow exceptions such as safeguarding and legal duties. If a curtain feels too thin for what you need to say, ask to move somewhere private. And the hospital should not even confirm you are there to a caller — a relative, a partner, an employer — unless you have said they may. If there is someone you specifically do *not* want informed, tell reception early.

## To see your own notes

Everything written about your visit — observations, results, clinical reasoning, discharge instructions — is yours to request. A Subject Access Request to the hospital's records department must be answered within a calendar month, free of charge, under UK data protection law. Your discharge summary should also reach your GP automatically; our [after your visit guide](/guides/after-your-ae-visit/) explains how to use both documents in your follow-up care.

## To hear another voice

Uneasy about a diagnosis or plan? You may ask for a second clinical opinion within the department. Far from causing offence, this mirrors what clinicians do among themselves constantly — emergency medicine runs on corridor consultations. A simple phrasing: *"I'd feel more comfortable if another doctor could take a look — is that possible?"*

## To speak up without fear

Raising a concern can never be held against your treatment; the NHS is explicit about that. The escalation ladder runs:

1. **In the moment** — the nurse in charge of the shift, who can fix many problems on the spot.
2. **Soon after** — the trust's Patient Advice and Liaison Service (PALS), an in-house team that untangles problems informally and quickly.
3. **Formally** — a written complaint to the trust, acknowledged within three working days.
4. **Independently** — the Parliamentary and Health Service Ombudsman if the trust's answer does not resolve it.

Our [complaints and feedback guide](/guides/complaints-and-feedback/) walks the whole ladder step by step, and trust contact details are listed in our [hospital directory](/hospitals/).

## To have someone in your corner

If illness, disability or distress makes self-advocacy hard, help exists: independent advocacy services (including free statutory NHS complaints advocacy), and — most immediately — any friend or relative you nominate. Tell staff clearly: *"This is my daughter; she speaks for me if I can't."* A companion who knows your baseline, remembers the questions and takes notes is the single most practical rights-protection tool there is.

## The short version

- Clear explanations, professional interpreters, and updates on your wait are entitlements — ask for them plainly.
- Your consent is required, your refusal is binding, and capacity is presumed unless shown otherwise.
- Privacy, dignity and confidentiality apply even in a corridor on a chaotic night.
- Your notes are yours: a Subject Access Request gets them within a month, free.
- Second opinions are normal; complaints are safe; PALS is the fast route when something goes wrong.
`,
  },
  {
    slug: "older-adults-in-ae",
    title: "Taking an Older Relative to A&E: A Companion's Handbook",
    description: "Frailty changes everything about an emergency visit — how illness shows itself, what to pack, and why your voice at the bedside matters so much.",
    category: "Children & Older Adults",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## Illness wears a disguise after 75

In a younger adult, a chest infection announces itself with cough and fever. In a frail older person, the same infection may show up as none of that — just a fall in the night, a refusal of breakfast, or a sudden inability to find the right words. Bodies with less reserve signal trouble in quieter, stranger ways, and that single fact shapes everything about emergency care for older people.

It also makes the accompanying relative or carer unexpectedly important. You know what "normal" looks like for this person. The staff do not. This guide is written mainly for you, the companion — though much of it applies if you are the older patient yourself.

## The presentations to take seriously

**A fall is never "just a fall."** It is the commonest reason over-65s come to A&E, and the question that matters is *why* it happened: a trip over the cat is one thing, but faints, new dizziness, infection and medication effects all masquerade as trips. Falls also carry outsized consequences — hip fractures, and head knocks that can bleed slowly inside the skull for days, a particular risk for anyone on blood thinners. Our [head injuries guide](/guides/head-injuries/) and [broken bones guide](/guides/broken-bones-and-sprains/) cover when a fall needs emergency care.

**New confusion is an alarm bell, not an inevitability.** A person who is suddenly more muddled, drowsier or more agitated than last week has *delirium* until proven otherwise — usually driven by something fixable: infection, dehydration, a medicine, constipation. It is never "just their age", and it is just as significant in someone who already lives with dementia, where the tell is a change from *their* baseline.

**Quiet decline counts too.** Stopping eating and drinking, new unsteadiness, sleeping through the day, "not being themselves" — vague as they sound, these are how serious illness often presents in frailty, and they deserve assessment. If you are unsure whether A&E is the right response, [NHS 111](/guides/using-nhs-111/) can arrange alternatives such as an urgent GP contact or a community rapid-response team, which for a frail person is sometimes the kinder route.

## Packing: the extras that matter

Start from our general [packing checklist](/guides/ae-packing-checklist/), then add the items that make or break an older person's visit:

- **The medicines, or photos of every box.** Older patients commonly take five or more drugs, and those drugs cause or complicate a large share of their emergencies. The actual boxes or blister packs are the most reliable record there is.
- **Glasses, hearing aids and dentures — each in a named case.** These three items go missing in hospitals constantly, and losing them turns a capable person into a disoriented one.
- **Their own walking aid.** Familiar equipment beats whatever the department can find.
- **Something warm.** Waiting rooms run cold, and older bodies lose heat fast.
- **A one-page crib sheet**: diagnoses, past operations, allergies, the GP practice, and contact details for any carers, district nurses or social workers involved. Write it now, before you need it.
- **Continence supplies**, if used — having their own preserves dignity during a long wait.

## Your job at the bedside

### Paint the "before" picture

The single most valuable thing a companion does is describe baseline. Triage readings mean little without context: a blood pressure that is "normal" may be far below this person's usual; "confused" means nothing unless staff know she chaired the book club on Thursday. Make the contrast explicit — *"Ten days ago he walked to the shop daily; today he can't cross the room"* — and repeat it to each new clinician. This is not being pushy; it is [how triage works best](/guides/how-triage-works/).

### Flag the hidden needs

Tell staff early which ear hears better, that he needs his glasses to sign anything, that she is diabetic and due lunch, that he normally needs prompting to drink, that she gets anxious in noise. Small facts, large consequences over a six-hour visit.

### Stand watch for delirium

Hospitals, ironically, are perfect delirium incubators: bright lights, alarms, thirst, pain, missed meals, no day-night cues. Watch for rising agitation, new drowsiness, seeing things, or a mind that flickers in and out. Report changes immediately — delirium is a medical emergency that responds best to early treatment — and meanwhile do the low-tech things that genuinely help: stay in view, remind them where they are and why, keep the hearing aids in and the water within reach.

### Guard comfort during the wait

Ask for a trolley or recliner if hard chairs are causing real distress; ask about pressure-area care if they cannot shift their own weight; ask whether they may eat and drink (and if so, keep it coming); ask for pain relief on their behalf — older patients famously under-report pain.

## The decisions at the end of the visit

For older patients the closing question is rarely just "what is the diagnosis?" but "**can this person manage at home tonight?**" Expect staff to weigh stairs, toileting, cooking, medication management and existing care arrangements alongside the medical findings. Be honest here — an over-optimistic account of coping at home sets up a failed discharge and a return visit within days.

Two useful things to know:

- **Admission is not automatically the safe option.** Hospital stays carry their own dangers for frail people — muscle loss sets in within days, infections circulate, unfamiliar wards feed confusion. Many trusts now run hospital-at-home or rapid community-support teams that can put extra care in place within hours; it is always worth asking, *"Is there a way to support them at home instead?"*
- **Discharge is a handover, not an ending.** Before leaving, get clear answers to: what changed with the medicines, what symptoms should bring us back, who follows up and when? If the visit involved a fall, ask for a referral to the local falls-prevention service. Then make sure the GP practice knows about any medication changes within a couple of days — the hospital-to-home transition is where errors creep in. Our [after your visit guide](/guides/after-your-ae-visit/) covers the follow-through in full.

Watch closely for a week after discharge: recovery is slower at this age, and creeping confusion, poor drinking or fading mobility are reasons to seek help again, not to wait and see.

## When the pattern keeps repeating

Three A&E visits in two months is a message. Often the underlying problem is not one illness but an unravelling situation — medicines that need a proper review, care that no longer stretches far enough, or plain loneliness, which is strongly tied to repeat attendance. The GP is the place to take that message: ask about a medication review, a frailty or falls assessment, and social-prescribing links to local support such as Age UK. Fixing the situation prevents more emergencies than any wait-time tactic ever will.

## Key takeaways

- Falls, new confusion and quiet decline are how emergencies present in older people — treat changes from baseline as significant.
- Pack the medicine boxes, the glasses–hearing-aids–dentures trio in named cases, and a one-page history.
- Your description of "what normal looks like" is clinical gold: give it at triage and to every clinician after.
- Watch for delirium during the wait and report it straight away.
- At discharge, nail down medication changes, red flags and follow-up — and if visits keep recurring, take the pattern to the GP. When a trip is unavoidable, [compare local waits](/near-me/) first to spare them the longest queues.
`,
  },
  {
    slug: "ae-packing-checklist",
    title: "The A&E Bag: Pack It in Five Minutes, Thank Yourself for Hours",
    description: "A practical packing list for the emergency department — the one item that speeds up your treatment, the comforts that rescue a long wait, and what stays home.",
    category: "Practical Advice",
    readTime: "6 min read",
    lastReviewed: "September 2026",
    content: `
## Pack for a short flight, not a quick errand

Nobody plans an A&E trip, but almost everyone under-packs for one. A visit can swallow an entire evening — sometimes an entire night — and the difference between a miserable wait and a tolerable one usually comes down to what you grabbed on the way out of the door. More importantly, one particular item genuinely speeds up your medical care.

Treat it like packing for a short-haul flight with no in-flight service. Here is the list, in strict order of importance.

## Tier one: the things that change your treatment

### Your medicines, in some form

Every clinician you meet will ask the same question first: *what do you take?* Arrive able to answer precisely and you remove delays, guesswork and a whole category of prescribing errors. Any of these formats works, ranked by reliability:

1. The boxes or blister packs themselves, swept into a carrier bag
2. Clear phone photos of every label
3. The NHS App, which lists your GP prescriptions
4. A written list — name, dose, how often — kept in a wallet or on the fridge

Whatever the format, include the unglamorous extras: painkillers bought over the counter, inhalers, herbal remedies, vitamins, and anything you have taken today for the problem that is bringing you in.

### Your allergy story

Not just the drug, but what it does to you. "Penicillin brings me out in a mild rash" and "penicillin closed my throat" lead to very different prescribing decisions, so know which sentence is yours.

### Your NHS number and a scrap of history

The ten-digit NHS number (on old hospital letters, prescriptions, or in the NHS App) pulls up your records fastest; name, date of birth and address work as a slower fallback. If your medical story is complicated, a single page listing your conditions, major operations, implants such as pacemakers or joint replacements, and your GP surgery is worth its weight in saved minutes. Some photo ID helps too, though nobody will turn you away without it.

## Tier two: the things that rescue the wait

- **Power.** A charged phone dies around hour three of any A&E visit — the hour you most need to update family. A charging cable plus a power bank beats hunting for the waiting room's one free socket.
- **Water and dull snacks.** Vending machines run out; waiting rooms rarely feed you. A refillable bottle and a couple of cereal bars or a sandwich cover you. Skip anything smelly. One caveat: if surgery or sedation is remotely possible, staff may ask you to stop eating and drinking — the moment they say "nil by mouth", obey it.
- **Entertainment that works offline.** Hospital Wi-Fi is a lottery, so download the podcast, the episodes or the book *before* leaving home. Add headphones.
- **A warm layer.** Clinical air conditioning does not care that it is July. A hoodie doubles as a pillow.
- **Spare clothes in a bag.** If your clothes are wet, bloodied or about to be cut off, a t-shirt and joggers save you the indignity of travelling home in a gown.
- **Coins or a card** for the car park — and check parking rules when you arrive, since a visit will outlast most short-stay tickets.

## Tier three: matched to your situation

- **Asthma** — the blue reliever and spacer, plus your action plan if written down
- **Diabetes** — meter, strips, insulin, and fast-acting sugar for hypos; declare the diabetes at the triage desk
- **Epilepsy** — rescue medication if prescribed, and a note of recent seizure dates
- **Pregnancy** — the handheld or digital maternity notes, always
- **Mental health crisis** — your crisis plan and community team details if you have them; our [mental health emergencies guide](/guides/mental-health-emergencies/) explains what the visit involves
- **Reduced mobility** — bring your own stick, frame or chair rather than relying on the department's stock

Taking a child? Layer on nappies, changes of clothes, formula or milk, the comfort object, and the red book — the full kids' list lives in our [guide to taking a child to A&E](/guides/taking-a-child-to-ae/). Accompanying an older relative? Their glasses, hearing aids and dentures (in named cases) plus the medicine boxes are the priorities — see the [older adults guide](/guides/older-adults-in-ae/).

## Leave behind

- **Anything precious.** Rings, heirlooms, serious cash, the good laptop. Waiting rooms are public places, and the hospital's lost-property form is cold comfort.
- **Anything that could read as a weapon.** Departments have security staff and, sometimes, searches.
- **The instinct to hide what you've taken.** Leave alcohol and drugs at home, but *tell staff honestly* about anything already in your system. It is confidential medical information, it changes which treatments are safe, and clinicians are not the police.

## The two-minute grab, and the zero-minute bag

Stick this somewhere findable — a phone note, the inside of a cupboard door:

1. Phone, cable, power bank
2. Medicine boxes (or the photos)
3. Water and a snack
4. Warm layer
5. Wallet, NHS number, keys
6. Headphones
7. Bag with spare clothes

Better still, if your household lives with a condition that makes emergencies plausible — heart disease, severe asthma, epilepsy, a fragile pregnancy — pre-pack a small bag and let it live by the door: medication list, latest clinic letter, charger, snack, water, jumper. Swap the perishables every few months. When the bad night comes, you pick it up and go, thinking about the person and not the packing.

## Arrived with nothing? You're still fine

Plenty of people reach A&E with only what they were wearing — that is how emergencies work, and departments are built for it. Records can be fetched electronically, blankets exist, water is free, and reception desks have rescued many a dying phone. If someone can follow on later, have them bring three things in this order: the medicines, a charger, something warm.

## Key takeaways

- The medicines list (or the boxes themselves) is the one item that actively speeds up and safens your care — everything else is comfort.
- Pack power, water, offline entertainment and a warm layer; a long wait punishes those without them.
- Match extras to your condition, and leave valuables and secrets at home — honesty about substances is medical, not legal.
- A pre-packed go-bag turns a panicked scramble into a thirty-second exit.
- Before setting off at all, [check which nearby department is quietest](/near-me/) — and if this is your first visit, our [first-timer's guide](/guides/your-first-ae-visit/) walks through what happens when you arrive.
`,
  },
  {
    slug: "overnight-and-weekend-care",
    title: "The NHS After Dark: Getting Help When Everything Looks Closed",
    description: "Your GP shuts at 6.30 pm, but the NHS doesn't. A tour of the overnight and weekend services most people never knew existed.",
    category: "Getting the Right Care",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## The 6.31 pm problem

A child spikes a fever on Friday night. A tooth abscess declares war on Sunday morning. Your last blood-pressure tablet rattles out of the box on a bank holiday. The surgery answerphone politely tells you to ring back Monday — and in that moment, most people can only think of one lit-up building: A&E.

Here is the thing: the NHS runs a whole second shift of services through evenings, nights, weekends and bank holidays. Most of them are faster than A&E for the problems they handle, and several can do things you might assume only a hospital could. The trick is knowing they exist before the crisis, not during it.

One rule before the tour: anything genuinely life-threatening — the situations in our [999 guide](/guides/calling-999/) — skips all of this. Dial 999. Everything else, read on.

## Start at the switchboard: 111

Around the clock, every day of the year, [NHS 111](/guides/using-nhs-111/) is the service that knows what else is open. Reach it by phone or at 111.nhs.uk (the online checker often beats the phone queue), answer a structured set of questions, and it will do one of several things:

- Talk you through safe self-care at home
- Book you a slot with the out-of-hours GP service
- Point you to a pharmacy that is still open
- Reserve you an arrival time at an urgent treatment centre or A&E
- Send an ambulance, if the answers reveal something serious

The booking power is the underrated part. Arriving at an out-of-hours service *with* a 111 booking usually beats turning up cold.

## The GP service that works while yours sleeps

Every part of England runs an out-of-hours GP provider — real GPs and nurses, staffing evening, overnight and weekend shifts from hubs that are often on hospital sites. It is not your own practice and they will not know your face, but they can examine you, diagnose, issue prescriptions, and escalate to hospital when needed. Many start with a call-back and bring you in only if hands-on examination is required. Access is almost always via 111 rather than by walking in — another reason 111 comes first.

## The pharmacy: the most underused clinician on the high street

Pharmacists are the NHS's hidden urgent-care workforce, and many pharmacies open late into the evening and across weekends. Beyond dispensing, the Pharmacy First scheme lets them assess and — where appropriate — supply prescription treatment for a defined set of common conditions with no GP involvement at all: urinary tract infections in women aged 16 to 64, sore throats, sinusitis, earache in children, impetigo, shingles, infected insect bites. Add expert advice on fevers, rashes, stomach upsets and medicines questions, and a ten-minute pharmacy conversation resolves an impressive share of the problems that would otherwise sit for hours in a waiting room. Find late openers via the NHS website's pharmacy search or by asking 111.

## Urgent treatment centres: the middle option

For injuries and illnesses that need same-day treatment but not the full machinery of an emergency department — a wrist that might be fractured, a cut needing stitches, a nasty sprain — an urgent treatment centre is usually the faster door. They open at least twelve hours a day, seven days a week, and typically offer X-rays, wound closure, casting and prescriptions. The full comparison lives in our [A&E versus urgent care guide](/guides/ae-vs-urgent-care/).

The overnight caveat: many UTCs close at 10 pm or midnight. Check hours before driving — our [hospital listings](/hospitals/) and [near-me page](/near-me/) show what is open and how busy it is.

## The specialist corners

**Teeth.** Out-of-hours dental pain goes through 111, which can book emergency dental slots where they exist. A&E cannot fill or extract teeth; it becomes the right place only when a dental problem turns dangerous — swelling that threatens breathing or swallowing, bleeding that will not stop, or facial trauma.

**Minds.** Mental health crisis support at 2 am does not require a waiting room: call 111 and select the mental health option to reach a crisis line, text SHOUT to 85258, ring Samaritans free on 116 123 any hour, or use the crisis-team number on your care plan if you have one. Some areas run evening safe havens and crisis cafés for walk-in support. When A&E *is* the right place — active self-harm, overdose, immediate danger — our [mental health emergencies guide](/guides/mental-health-emergencies/) describes what to expect.

**Eyes.** Sudden vision loss, flashes and a shower of new floaters, chemical splashes and severe eye pain need same-night attention. Some cities run dedicated eye casualty units with their own hours; elsewhere A&E covers it. 111 knows which applies where you live.

## Sick children after hours

Out-of-hours worry hits hardest when the patient is small. Two truths hold at once: children can deteriorate quickly, so a lower threshold for seeking advice is right — and most feverish, vomiting, miserable children have self-limiting illnesses that home care handles well. 111 runs child-specific pathways designed for exactly this call, and our [guide to taking a child to A&E](/guides/taking-a-child-to-ae/) lists the red flags — the drowsy-and-hard-to-wake child, the non-blanching rash, laboured breathing — that mean emergency care now, no phone call first.

## What can genuinely wait for Monday

Not every discomfort needs a night-time answer. A fresh cold, mild back strain, a small rash in someone otherwise well, a question about a long-standing condition, a routine repeat prescription — these keep safely until the surgery reopens. If doubt nags at you, that is precisely what 111 is for; "should this wait?" is a question it answers all night long.

Worth knowing about prescriptions: run out of a regular medicine at the weekend and a pharmacist can often supply an emergency quantity, or 111 can arrange an urgent prescription — a far better fix than an A&E trip for tablets.

## Why the "just go to A&E" reflex backfires

A&E at midnight sorts patients by clinical danger, exactly as it does at midday — see [how triage works](/guides/how-triage-works/). Arrive with a pharmacy-level problem and you will be placed, correctly, behind every ambulance the night brings in. The result is a four-hour lesson in the [wait-time statistics](/statistics/): not punishment, just prioritisation. The services above exist precisely so that you never have to learn it first-hand.

## Ten minutes of prep that pays for years

- Save 111 in your phone and bookmark 111.nhs.uk
- Look up tonight, while nothing is wrong: your nearest UTC and its closing time, and your late-opening pharmacy
- Keep repeat prescriptions topped up ahead of weekends and bank holidays
- Living with a long-term condition? Find out whether your specialist nurses run an acute advice line — where one exists, it beats every other route during a flare-up
- Bookmark our [live wait comparison](/near-me/) for the nights when hospital is unavoidable, and skim the [quietest times guide](/guides/quietest-times-to-visit/) so you can time a non-urgent visit sensibly

## Key takeaways

- The NHS never fully closes: 111, out-of-hours GPs, late pharmacies, UTCs, dental slots and crisis lines all run when your surgery does not.
- Make 111 your default first move for anything urgent-but-not-life-threatening — it assesses, advises and books.
- Pharmacists can treat and prescribe for a growing list of common conditions under Pharmacy First.
- Reserve A&E for emergencies and for what only it can do; for everything else it is the slowest possible queue.
- The best out-of-hours decision is made in advance — learn your local options before the 6.31 pm problem arrives.
`,
  }
,
  {
    slug: "broken-bones-and-sprains",
    title: "Is It Broken? Sorting Out Fractures, Sprains and Strains",
    description: "What to do in the first hour after a limb injury, the clues that point towards a break, and where you will be seen fastest.",
    category: "Symptoms & Injuries",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## That sickening moment

You land awkwardly on the five-a-side pitch, your child comes off the trampoline clutching a wrist, or an icy pavement takes your feet from under you. Something hurts, it is starting to swell, and the question everyone around you is asking is the same one going through your head: is it broken?

Here is the honest truth up front: without an X-ray, nobody can be certain — not you, not a first aider, and often not an experienced clinician. But there are useful clues, and the first aid is identical either way, so you can act confidently before you know the answer.

## Three injuries that look alike

- **A fracture** means the bone itself has cracked or snapped. That covers everything from a fine hairline crack to a bone in several pieces. If bone has come through the skin, that is an open fracture — a genuine emergency.
- **A sprain** means a ligament (the strap of tissue holding a joint together) has been stretched or torn. Mild sprains settle in a couple of weeks; a fully torn ligament can be every bit as painful and slow to heal as a break.
- **A strain** means a muscle or tendon has been overstretched or torn — think a pulled hamstring. It is managed much like a sprain.

## Clues that lean towards a break

None of these prove anything on their own, but the more of them you tick, the more likely an X-ray will show a fracture:

- The limb or digit looks the wrong shape — angled, twisted or shorter than its partner on the other side
- Putting weight through a leg is impossible, or the hand cannot grip at all
- Pressing gently on one precise point of the bone produces sharp, well-localised pain
- The swelling ballooned within minutes rather than creeping up over the evening
- There is pins-and-needles, numbness, or pale or bluish skin beyond the injury
- The person is older — bones become more fragile with age, so a modest fall can do more damage

Pain that centres on the joint, a joint that still moves through its range (however grumpily), some ability to take weight, and bruising that appears gradually all lean towards a sprain. But lean is the operative word — plenty of confirmed fractures started with "I can wiggle it, so it can't be broken." You can. Ignore that myth.

## The first hour: what actually helps

Whatever the injury turns out to be, the same steps apply straight away:

1. **Stop.** Come off the pitch, sit down, and resist the urge to "walk it off" or test the limb by forcing it to move.
2. **Support it.** Keep the injured part still and comfortable — a cushion under an ankle, a makeshift sling for an arm.
3. **Cool it.** Wrap ice or a bag of frozen sweetcorn in a tea towel and hold it on for 15 to 20 minutes at a time, with breaks between. Never put ice straight onto bare skin.
4. **Compress gently.** A soft bandage can limit swelling. If fingers or toes beyond it go numb, tingly or pale, it is too tight — loosen it.
5. **Raise it.** Getting the injury above heart level, where practical, helps drain swelling.

Paracetamol and ibuprofen (if they are safe for you) will take the edge off the pain. A word on modern thinking: total rest for days on end is no longer the advice for milder sprains. Once the initial pain settles, gentle early movement actually speeds recovery — protect the joint, but do not mothball it.

**And what not to do:** never pull on a deformed limb to "straighten" it, leave a boot on a badly swelling ankle rather than wrestling it off, skip the alcohol (it worsens swelling and hides pain), and hold off on hot baths or heat packs for the first couple of days.

## Picking the right front door

### Straight to A&E — or 999

Go to an emergency department without stopping to weigh options if the limb is obviously deformed, bone is visible, the skin beyond the injury is cold, white or blue, the pain is unbearable despite painkillers, or the injury involves the hip, pelvis, back or head. If the person cannot be moved safely or the injury came from a serious crash or a fall from height, [call 999](/guides/calling-999/) instead.

### An urgent treatment centre — usually the quicker option

For the classic everyday injuries — a suspected wrist or ankle fracture where the limb looks broadly normal, sprains, strains, a bent finger — an urgent treatment centre is generally the smarter destination. Most have X-ray machines, can fit splints and casts, and their queues move faster than a major A&E's. Our comparison of [A&E versus urgent care](/guides/ae-vs-urgent-care/) walks through the differences, and you can [compare live waits near you](/near-me/) before you set off.

### Stay home, watch and wait

If the swelling is modest, you can hobble on it, bruising is slow to appear and painkillers are doing their job, it is reasonable to manage the injury yourself for 48 hours and see how it trends. Not improving, or getting worse? [NHS 111](/guides/using-nhs-111/) can book you into the right service.

## What the hospital visit looks like

Expect [triage](/guides/how-triage-works/) first, then an examination — the clinician will check movement, feeling and circulation beyond the injury, and press along the bone. If a fracture is plausible you will be sent round to X-ray, and the images decide what happens next: a cast or splint for a confirmed break, strapping and rehabilitation advice for a sprain. Fractures almost always come with a fracture clinic appointment a week or so later, where the position of the healing bone is checked.

## A note about children

A child's skeleton contains growth plates — soft zones near the ends of bones where growth happens — and injuries there can be invisible on a first X-ray yet matter enormously for how the limb develops. Children also break bones in ways adults do not (greenstick fractures, where the bone bends and cracks on one side). Have a low threshold for getting a child's injury imaged, and read our guide on [taking a child to A&E](/guides/taking-a-child-to-ae/) before you go.

## Trouble signs during recovery

Most limb injuries heal uneventfully, but come back urgently if you notice:

- **Pain out of all proportion**, especially under a cast — a tight, bursting, escalating pain can signal compartment syndrome, which needs surgery the same day
- **A hot, swollen, tender calf** after a leg injury — a possible blood clot
- **Fever, spreading redness or discharge** from any wound near the injury
- A limb that still cannot be used weeks later, or a joint that keeps giving way — flag it to your GP or the fracture clinic rather than assuming it is normal

Our guide on [what to do after your visit](/guides/after-your-ae-visit/) covers discharge instructions and follow-up in more detail.

## The short version

- You cannot rule a fracture in or out by eye — deformity, instant swelling and point tenderness raise suspicion, but only an X-ray settles it
- Rest, ice through a cloth, gentle compression and elevation help every limb injury while you decide
- Deformed limb, exposed bone, or a cold, pale hand or foot → A&E now; ordinary suspected breaks and sprains → an urgent treatment centre is usually faster
- Reintroduce gentle movement early for mild sprains, and take escalating pain under a cast seriously
- [Check live waiting times](/near-me/) before travelling — the nearest door is not always the quickest
`,
  },
  {
    slug: "burns-and-scalds",
    title: "Burns and Scalds: Why 20 Minutes Under the Tap Matters Most",
    description: "The single first-aid step that changes how a burn heals, the myths to avoid, and how to judge whether a burn needs hospital care.",
    category: "Symptoms & Injuries",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## One rule before everything else

If you take a single thing from this page, make it this: **hold the burn under cool running water for a full 20 minutes.** Not a quick splash. Not a dab with a wet cloth. Twenty timed minutes under the tap.

It sounds almost too simple, but this one step pulls heat out of the tissue, limits how deep the damage goes, eases pain, and measurably reduces scarring and the chance of needing a skin graft. Research from burns units consistently shows that people who cool properly do better — and remarkably, cooling still helps if you start up to three hours after the injury. So even if the kettle went over half an hour ago, get to a tap now, then read on.

## Doing the 20 minutes properly

- Use water that feels cool but comfortable — around the temperature of a cold tap in spring. Icy water does harm, not good.
- Set a timer. Twenty minutes feels endless with a crying child; without a timer almost everyone stops early.
- While the water runs, slide off rings, watches and loose clothing near the burn before swelling makes that impossible. Leave anything that is stuck to the skin exactly where it is.
- Keep the rest of the person warm, especially small children and older people — you are cooling one patch of skin, not the whole body.

Once cooling is done, lay cling film loosely over the burn (along it, not wound round a limb like a bandage). Straight off the roll it is effectively sterile, it will not stick to raw skin, and staff can inspect the burn through it. No cling film? A clean plastic bag or a smooth, non-fluffy cloth will do. Then give paracetamol or ibuprofen, because burns hurt a great deal.

## The kitchen-cupboard myths

Generations of well-meant advice have made burns worse. To be clear:

- **No butter, oil, egg white or toothpaste.** They seal heat in and feed infection.
- **No ice or freezer packs on the skin.** Extreme cold constricts the blood supply and can deepen the burn.
- **Do not burst blisters.** The blister roof is a natural sterile dressing; opening it at home invites infection.
- **No sticky plasters** directly on burned skin, and no cotton wool — the fibres embed in the wound.

## How bad is it? Two questions

### How deep does it go?

- A burn that is red, sore and dry — classic sunburn territory — involves only the surface layer and usually heals within a week.
- Blistering, weeping, intensely painful skin means the burn has gone into the deeper layer. These take weeks to heal and can scar.
- Skin that looks waxy white, brown or charred, or feels leathery — particularly if it is strangely painless because the nerves are gone — is a deep burn that will always need specialist care.

### How big is it?

A handy yardstick: the injured person's own palm and fingers cover roughly one per cent of their body surface. Anything bigger than their palm deserves professional assessment; in a young child, anything approaching palm-size does.

## When to dial 999

Some burns are ambulance jobs from the start:

- Anyone caught in a house fire or exposed to thick smoke — a hoarse voice, coughing, soot around the mouth or singed eyebrows suggest the airway itself may be burned, which can close up fast
- Burns from electricity — the surface mark can be tiny while the damage inside is severe
- Chemical splashes to the eye (rinse continuously while help is on the way)
- Extensive burns, deep burns of any size, or a person who is becoming pale, drowsy or confused
- Burns alongside other serious injuries, such as after an explosion or crash

If you are unsure whether it is a 999 situation, our [guide to calling 999](/guides/calling-999/) can help you decide quickly.

## When A&E is the right place — under your own steam

Make your way to an emergency department for:

- Any burn on the **face, hands, feet, genitals or across a joint** — these areas scar and stiffen in ways that affect function, so specialists want to see them regardless of size
- Blistered burns **larger than the person's palm**
- A burn that wraps **all the way around** a finger, arm or leg — swelling inside a complete ring of burned skin can cut off circulation
- **Any burn in a child under five or an adult over sixty** — and in a baby under one, treat every burn as needing professional assessment without exception
- Chemical burns, once you have irrigated thoroughly
- Anything you honestly cannot judge — clinicians would far rather reassure you than see a neglected burn a week later

Have a look at [live A&E waits nearby](/near-me/) before choosing a department if more than one is reachable.

## Smaller burns: urgent treatment centre or home

An [urgent treatment centre](/guides/ae-vs-urgent-care/) can clean and dress modest burns and scalds — a splash from a pan, a grab of a hair straightener — provided they are smaller than a palm and not on the sensitive areas listed above. Truly minor burns (smaller than a postage stamp, surface-level, not on the face or hands) can be managed at home: keep them clean, cover with a non-stick dressing, and watch for spreading redness, increasing pain, oozing or fever over the following days, any of which means infection and a same-day appointment. [NHS 111](/guides/using-nhs-111/) is the right call when you are hovering between options.

## Why children are different

A toddler's skin is dramatically thinner than an adult's, so the same cup of tea burns deeper — and a mug of tea can still scald a small child a quarter of an hour after it was made. Hot-drink scalds are the single most common serious burn in under-fives, usually from a mug pulled off a table edge. Do the same 20-minute cooling (a shower head or gently poured jugs of cool water work if the child will not tolerate the tap), keep them warm and cuddled, and set your threshold for professional assessment much lower than you would for yourself. Our guide to [bringing a child to A&E](/guides/taking-a-child-to-ae/) covers what the visit itself will involve.

## What happens at hospital, and afterwards

Expect the team to assess the depth and area of the burn, clean it properly with good pain relief, decide what to do with blisters (practice varies — leave that call to them), apply a specialist dressing, and check your tetanus status. Deeper or awkwardly placed burns get referred on to a regional burns service, and the deepest may eventually need grafting. Afterwards there is often a rhythm of dressing changes at your GP surgery or a clinic, then months of scar care: moisturise, keep healed skin out of the sun or under high-factor sunscreen, and do any stretching exercises you are given so skin over joints stays supple. Our [after your visit guide](/guides/after-your-ae-visit/) explains discharge paperwork and follow-up generally.

## The short version

- Cool running water for a timed 20 minutes — the most valuable thing anyone can do, effective up to three hours after the burn
- Cling film on loosely, painkillers in, jewellery off early
- Never ice, butter, creams or burst blisters
- Face, hands, feet, genitals, joints, ring-shaped burns, deep burns, palm-sized-or-bigger blistering, and every burn in a baby → hospital
- Smoke inhalation, electrical and large burns → [999](/guides/calling-999/)
- Unsure? [111](/guides/using-nhs-111/) for advice, or [find your nearest department](/near-me/)
`,
  },
  {
    slug: "head-injuries",
    title: "Head Injuries: The Red Flags You Must Not Sleep On",
    description: "How to judge a knock to the head, the symptoms that mean hospital now, and how to keep watch safely over the next 48 hours.",
    category: "Symptoms & Injuries",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## The deceptive injury

Most bangs on the head amount to nothing more than a bruise and a bad mood. The problem is the small minority that do not — because a bleed inside the skull can build slowly while the injured person walks, talks and insists they are fine. Someone can seem completely themselves for hours before deteriorating. That is why head injuries get their own rulebook: the decision is based less on how the person looks right now and more on what happened, who they are, and which symptoms appear over time.

This guide gives you that rulebook.

## Call 999 now if any of these apply

Do not drive them yourself, do not wait to see how things develop — phone an ambulance if the person:

- Was knocked out, even for a moment, and is now hard to rouse, confused or drowsy
- Has a fit or convulsion
- Has straw-coloured or clear fluid, or fresh blood, coming from an ear or the nose
- Develops weakness down one side, slurred speech, or trouble understanding you
- Has unequal pupils, a visible dent in the skull, or a soft, squashy swelling rather than an ordinary hard lump
- Keeps vomiting
- Was hurt in a high-force way — a road collision, a fall from well above head height, an assault with a weapon

If they are unconscious but breathing, put them on their side in the recovery position — unless the mechanism suggests a neck injury (a dive into shallow water, a fall from height, neck pain or limb tingling), in which case keep the head and neck still and let the call handler guide you. Our [999 guide](/guides/calling-999/) covers what to expect on the call.

## Get to A&E today — by car or taxi is fine

A trip to the emergency department, without an ambulance, is the right move when the person:

- Blacked out briefly but has come round fully
- Cannot remember the accident itself, or the minutes before or after it
- Has vomited since the injury (once is enough to earn a check)
- Has a headache that is climbing rather than fading, despite paracetamol
- **Takes any blood-thinning medicine** — warfarin, apixaban, rivaroxaban, edoxaban, dabigatran, clopidogrel or similar. This point is non-negotiable: on these drugs, even a trivial-looking bump can bleed inside the skull, and every such injury needs same-day assessment
- Is over 65, has had brain surgery in the past, or has a clotting disorder
- Was drinking heavily or has taken drugs — intoxication masks the very symptoms you are watching for

Never let someone with a head injury drive themselves. If you are choosing between departments, [live waiting times](/near-me/) can help — but with any of the signs above, nearest beats quietest.

## When home is safe — and how to keep watch

Plenty of head injuries genuinely need nothing more than a cold flannel and sympathy. Home is reasonable when the knock was minor (a doorframe, a low cupboard), there was no blackout, no memory gap, no vomiting, the person is behaving entirely normally, and nobody involved takes blood thinners.

Even then, keep a watch running for 48 hours, because delayed deterioration is the whole danger with heads:

- Someone responsible should stay with the person for the first day — do not leave them alone in the house overnight
- Overnight, check on them every two to three hours: they should rouse easily and answer sensibly. Groggy is fine; unrousable is 999
- No alcohol, no sleeping tablets, and no driving or big decisions for 48 hours — reactions and judgement dip even after mild concussion
- Paracetamol is the painkiller of choice at first; avoid ibuprofen and aspirin in the first day or so unless a clinician says otherwise, as they can slightly increase bleeding

**Return immediately** — day or night, our [overnight care guide](/guides/overnight-and-weekend-care/) confirms A&E never closes — if drowsiness deepens, vomiting starts, the headache turns severe, vision doubles or blurs, behaviour turns strange or irritable, limbs weaken, or fluid appears from the nose or an ear.

## Babies and children

Small children collect head bumps as a hobby, and the vast majority are trivial. Still, they deserve extra caution: an infant's skull is thin, and a baby cannot tell you about blurred vision or a pounding head. Take a child to A&E if they were knocked out at all, have vomited more than once, fell further than their own height onto something hard, have a large boggy swelling (as opposed to the classic hard "egg"), seem unusually sleepy or floppy, will not settle despite every trick you know, or — for babies — are refusing feeds. Under-ones with anything beyond the gentlest bump should simply be checked. There is more on the practicalities in our guide to [taking a child to A&E](/guides/taking-a-child-to-ae/).

## Older adults: a special warning

The over-65s face a double risk. First, blood thinners are common at this age, and they transform the arithmetic of even minor bumps. Second, a type of slow bleed (a subdural haematoma) can develop over days or even weeks in older people — so a fall in the garden a fortnight ago can be the cause of today's new confusion, unsteadiness or personality change. If an older relative has "not been right" since a fall, do not put it down to age: get them assessed, and mention the fall. Our guide on [older adults in A&E](/guides/older-adults-in-ae/) covers how to advocate for them once you are there.

## What the hospital will actually do

After [triage](/guides/how-triage-works/), a clinician runs a neurological examination — pupils, limb strength, balance, memory, orientation. NHS departments follow national criteria for who needs a CT scan of the head: things like loss of consciousness, amnesia, repeated vomiting, blood thinners, age, and the force involved all feed into that decision, and the scan usually happens within an hour or so of it being requested. A clear scan plus a period of observation generally means home with a written head-injury advice sheet; a bleed or fracture means admission, occasionally with transfer to a neurosurgical centre. Bring a list of medications — the anticoagulant question is the single most important thing the team needs to know.

## Concussion: the weeks after

If the diagnosis is concussion, expect headaches, fogginess, tiredness, poor concentration and sensitivity to light or noise for a week or two. Recovery works best as a staircase: a couple of days of genuine rest, then a gradual return to normal life as symptoms allow, easing off whenever they flare. Two hard rules: no alcohol until recovered, and absolutely no return to rugby, football, boxing, riding or any collision sport until symptom-free and through a graduated return — a second concussion on top of an unhealed first one can be catastrophic. Symptoms dragging past two to three weeks warrant a GP review.

## The short version

- Head injuries can look fine and then go wrong — judge by red flags and risk factors, not appearances
- 999 for unconsciousness with drowsiness, fits, fluid from ears or nose, one-sided weakness or repeated vomiting
- Same-day A&E for any blackout, memory gap, single vomit, worsening headache — and **always** for anyone on blood thinners, however small the bump
- Watch minor injuries at home for 48 hours, with overnight checks and zero alcohol
- Extra caution with babies, and with older people who "haven't been right" since a fall
- [Find your nearest emergency department](/near-me/) — and remember it is open at 3 am too
`,
  },
  {
    slug: "chest-pain-advice",
    title: "Chest Pain: Act First, Diagnose Later",
    description: "Why chest pain earns a 999 call, what to do in the minutes before help arrives, and the causes that turn out to be harmless.",
    category: "Symptoms & Injuries",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## Read this bit first

If you have chest pain **right now** that feels heavy, tight or crushing — or pain spreading into your arm, jaw, neck or back — put your phone to better use than reading: **dial 999.** A wrong guess in the cautious direction costs an ambulance crew an hour. A wrong guess in the other direction can cost heart muscle, or a life. Nobody in the NHS will think less of you if it turns out to be indigestion; call handlers and paramedics deal with exactly this uncertainty all day and would always rather come.

If your pain has passed, or you are reading on someone's behalf, carry on.

## The symptoms that mean phone, now

Treat chest pain as a possible heart attack — and call 999 — when it comes with any of the following:

- A sensation of **weight, squeezing or a tight band** across the centre of the chest, rather than a pinpoint stab
- Pain **travelling** into either arm (not just the left), the jaw, the throat, the back or the upper belly
- **Breathlessness**, even sitting still
- Skin gone **grey, clammy or drenched in cold sweat**
- **Feeling sick**, light-headed or close to fainting
- A **thumping, racing or chaotic heartbeat**
- An overwhelming, hard-to-describe sense that something is badly wrong — clinicians take this symptom seriously, and so should you
- Pain lasting more than **15 minutes**, or coming on during rest or minimal effort

### While the ambulance is on its way

1. Stop all activity and sit down — on the floor, propped against a wall with knees bent, is a good position
2. If there is **aspirin** in the house, you are not allergic, and you have never been told to avoid it, chew one adult tablet (300 mg) slowly — chewing speeds absorption
3. Anyone with a prescribed **GTN spray** for angina should use it as they have been taught
4. Unlock the door, put pets away, and if possible have someone stand outside to flag the crew down
5. Do not eat, do not have a cigarette, and do not let the person talk you into driving them — a cardiac arrest in a moving car helps no one

## What a heart attack actually is

A clot blocks one of the coronary arteries feeding the heart muscle, and the muscle beyond it starts to die for lack of oxygen. Modern treatment — clot-dissolving drugs, or a wire-and-balloon procedure that reopens the artery — is remarkably effective, but its benefit shrinks with every passing minute of blockage. That is the entire logic behind the "call first, wonder later" rule: the treatment works, and it works best early.

**One thing worth knowing about women:** heart attacks in women more often skip the textbook chest-clutching presentation. Unexplained breathlessness, nausea that feels like a stomach bug, aching in the jaw or between the shoulder blades, and profound unusual tiredness in the preceding days are all recognised patterns. Women wait longer, on average, before calling for help — and are more likely to be sent home undiagnosed. If the combination feels wrong, say the words "I think this could be my heart" and let the professionals prove you wrong.

## Other emergencies that announce themselves in the chest

The heart is not the only serious possibility. Three others deserve a mention:

- **A clot on the lung** (pulmonary embolism): sharp pain that catches when you breathe in, with breathlessness and a fast pulse. Think of it especially after recent surgery, a long-haul flight, a plastered leg, during pregnancy, or on the combined pill. 999.
- **A tear in the main artery** (aortic dissection): abrupt, ferocious pain often described as ripping, felt in the chest or between the shoulder blades. Rare, but a true emergency. 999.
- **A collapsed lung** (pneumothorax): sudden one-sided sharp pain plus breathlessness, classically in tall slim young men or people with lung conditions. Needs emergency assessment.

## The reassuring end of the spectrum

Most chest pain seen in general practice is not cardiac. The common benign culprits have recognisable fingerprints:

- **Chest-wall pain.** A gym session, a coughing fit or an awkward lift strains the muscles and cartilage of the ribcage. The giveaway: pressing on the sore spot reproduces the pain, and twisting or deep breaths make it worse. Painkillers and patience fix it.
- **Acid reflux.** A burning behind the breastbone after a big meal, worse lying flat or bending, often with a sour taste. An antacid usually settles it within minutes. Be aware that reflux and cardiac pain can genuinely mimic each other — persistent doubt still deserves assessment.
- **Panic attacks.** A pounding heart, tight chest, tingling fingers and racing breath, often with a terror of dying — the symptoms are physically real, not imagined. If it has never happened before, get checked once; a normal cardiac work-up then becomes powerful reassurance for future episodes. Our [mental health emergencies guide](/guides/mental-health-emergencies/) covers where to turn if panic attacks keep recurring.
- **Shingles.** One-sided burning or stabbing chest-wall pain a few days before a stripy rash appears. See a GP promptly — early antivirals help.

## A rough decision guide

- Crushing, spreading, or paired with sweating, sickness or breathlessness → **999, now**
- Sudden, severe and unlike anything before → **999**
- Sharp, one small spot, worse on pressing or moving → likely muscular; painkillers, GP if it drags on
- Burning after food, eased by antacids → likely reflux; GP if it keeps returning
- First-ever episode of anything you cannot confidently place → get assessed today, via [111](/guides/using-nhs-111/) if you are genuinely unsure it is an emergency

Notice what is missing from that list: "wait and see how it is in the morning" does not appear anywhere next to possible cardiac symptoms.

## What A&E will do with chest pain

Chest pain jumps the queue. At [triage](/guides/how-triage-works/) you will be moved quickly to have an **ECG** — a five-minute heart tracing that can show a major heart attack immediately. Blood is taken to measure **troponin**, a protein that leaks from injured heart muscle; because it takes time to rise, a second sample a few hours later is standard, which is why chest-pain visits often involve several hours of monitored waiting even when everything is heading towards good news. A chest X-ray, blood pressure in both arms and a detailed history round out the work-up. Bring your medication list — our [packing checklist](/guides/ae-packing-checklist/) is worth a skim before any visit.

If the heart is cleared, you leave with an explanation and a plan; if not, you are in exactly the right building, and the cardiology pathway takes over. Either way, our guide to [life after discharge](/guides/after-your-ae-visit/) covers the follow-up steps. It is also worth asking your GP about a free NHS Health Check (ages 40 to 74) — blood pressure, cholesterol and diabetes screening quietly deal with the biggest heart risks before they ever cause pain.

## The short version

- Heavy, tight or spreading chest pain, or pain with sweating, sickness or breathlessness: **call 999** — sit down, chew 300 mg of aspirin if available, unlock the door
- Speed of treatment determines how much heart muscle survives; hesitation is the real risk
- Women's heart attacks are more often atypical — breathlessness, nausea, jaw or back ache, crushing fatigue
- Pressable, movement-related or food-related pain is usually benign — but a first, unexplained episode always deserves same-day assessment
- For chest pain, do not shop around on [waiting times](/statistics/) — ambulance-borne chest pain is prioritised the moment it arrives
`,
  },
  {
    slug: "after-your-ae-visit",
    title: "Home from A&E: Making the Next 72 Hours Count",
    description: "The questions to ask before you leave the department, how to manage medicines and follow-ups, and the signs that mean coming back.",
    category: "Practical Advice",
    readTime: "6 min read",
    lastReviewed: "September 2026",
    content: `
## Discharge is a handover — to you

By the time you are told you can go home, you may have been in the department for six hours, it may be two in the morning, and your main ambition is your own bed. Which is precisely when the most important information of the whole visit — what to do next and what to watch for — gets delivered, half-heard and swiftly forgotten.

Think of discharge as a handover of responsibility from the hospital to you. Like any handover, it goes better when you know which questions to ask.

## Five questions to ask before you walk out

1. **"What do you think it is — or what have you ruled out?"** Sometimes the answer is a firm diagnosis; often it is "the dangerous things are excluded, and here is the most likely explanation." Both are useful. Leaving without either is not.
2. **"Exactly what should bring me back?"** Clinicians call this safety-netting, and it is the crown jewel of discharge advice. Get it specific — which symptoms, in what timeframe — and get it written down, on paper or typed into your phone there and then.
3. **"What do I do about medicines?"** New prescriptions: what is it, how often, for how long, with food or not, and can a normal pharmacy dispense it tomorrow or must you collect it from the hospital tonight? Just as important: has anything you already take been stopped or changed?
4. **"Who follows this up, and how does that get arranged?"** Does a clinic contact you, do you phone a number, or should you book with your GP? Vague answers evaporate — pin them down.
5. **"Is there anything I should avoid?"** Driving, alcohol, work, sport, flying, getting a dressing wet — restrictions vary hugely by condition, and nobody volunteers them unless asked.

If your visit was overnight, note that some services around the hospital keep office hours — our [overnight and weekend guide](/guides/overnight-and-weekend-care/) explains what runs around the clock and what does not.

## The first day home

**Eat, drink, sleep.** Hospital visits are dehydrating, hungry, exhausting experiences. A meal, plenty of fluids and a proper sleep are genuinely part of the treatment. Clear the diary for at least a day.

**Get the painkiller timing right.** Ask when your last hospital dose was given so you do not accidentally double up. Two rules cover most trouble: never exceed eight 500 mg paracetamol tablets in 24 hours (and remember cold-and-flu remedies often contain hidden paracetamol), and skip ibuprofen entirely if you were told to — that instruction usually exists for a reason, such as a recent head injury or a sensitive stomach. Codeine-type painkillers cause drowsiness and constipation; no driving while drowsy.

**Run the watch-list.** Whatever safety-net symptoms you were given, actively check for them rather than waiting for them to announce themselves. Carers looking after someone else should set phone alarms. Head-injury patients need waking and checking overnight — the specifics are in our [head injuries guide](/guides/head-injuries/).

## The first week

**Loop in your GP.** The hospital does send your GP a discharge summary, but it can lag by days. A quick message through your surgery's online system — "attended A&E on Tuesday, started on X, told to arrange Y" — closes the gap. This matters most when antibiotics, blood thinners or mental-health medicines were started, or when a test result was still pending as you left, because pending results land on your GP's desk.

**Care for any wound.** Stitched, glued or strip-closed cuts want to stay clean and dry for the first two days. You should know the removal plan before leaving — stitches typically come out after three to fourteen days depending on where they are (facial ones earliest), usually at your GP practice, while glue and dissolvable stitches simply disappear on their own. The infection signs to know by heart: redness that spreads outward, growing pain after day two (wounds should hurt less each day, not more), warmth, swelling, pus, or a temperature. Any of those: same-day advice, via your GP or [111](/guides/using-nhs-111/).

**Sort the paperwork.** You can self-certify for the first seven calendar days off work — no note needed. For anything longer, the hospital can issue a fit note covering the period its clinicians advised you were unfit, and after that fit notes come from your GP practice. If a fracture clinic, outpatient referral or scan was promised and a week passes with silence, chase it — ring the number on your paperwork or ask PALS at the hospital to track it down. Appointments do occasionally fall through administrative cracks, and the patient who phones is the patient who gets rebooked.

## Going back: when, and without guilt

Return to the emergency department if:

- A safety-net symptom appears — this is exactly what the list was for
- You are trending worse when you were told to expect better
- A new medicine triggers a severe rash, facial swelling or breathing trouble
- You cannot keep fluids or essential tablets down
- Something feels seriously wrong in a way you cannot articulate — that instinct has value

You need no referral, no appointment and no permission to walk back in, and returning is not an admission of fussiness. Emergency staff consistently say the same thing: they would far rather recheck ten people who turned out fine than miss the one who was not. If the return trip is concerning-but-not-urgent, a glance at [live waiting times](/near-me/) helps you pick the calmest department; if it is urgent, nearest wins.

For the things that do **not** need A&E — lingering questions about the diagnosis, ongoing pain management, minor side effects, fit notes, non-crisis mental-health follow-up — your GP is the right door, and [111](/guides/using-nhs-111/) covers the gaps when the surgery is shut.

## Two things people rarely mention

**You can get your notes.** Everything from your visit — observations, test results, the clinician's reasoning — is your data, and a subject access request to the hospital's records team gets you a copy free of charge. It is worth having before specialist appointments, for insurance claims, or simply to understand a blurry night. Our [rights in A&E guide](/guides/your-rights-in-ae/) explains the process.

**The wobble afterwards is normal.** A frightening symptom, a chaotic waiting room, bad news for the patient on the next trolley — emergency visits can leave an emotional residue of jumpiness, tearfulness or exhaustion that surfaces days later. Give it air: talk to someone. If it has not eased after a couple of weeks, or it is disturbing sleep and daily life, your GP can help — and our [mental health emergencies guide](/guides/mental-health-emergencies/) covers support that is available immediately if things feel urgent.

## The short version

- Before leaving: get the working diagnosis, written return-symptoms, medicine instructions, the follow-up plan and any restrictions
- First 24 hours: rest, fluids, careful painkiller timing, active symptom-watching
- First week: message your GP, mind the wound, chase any promised appointment that has not materialised
- Go back for safety-net symptoms, deterioration or drug reactions — freely and without embarrassment
- GP and [111](/guides/using-nhs-111/) handle everything that is important but not urgent
`,
  },
  {
    slug: "complaints-and-feedback",
    title: "Unhappy With Your A&E Care? Here's How to Be Heard",
    description: "From a quiet word with the nurse in charge to the Health Service Ombudsman — every route for feedback and complaints, explained.",
    category: "Your Rights",
    readTime: "7 min read",
    lastReviewed: "September 2026",
    content: `
## First, the fear to put aside

The biggest reason people swallow a bad experience in A&E is worry: that complaining marks their card, that future care will suffer, or that hard-pressed staff do not need the grief. Let us deal with that directly. The NHS Constitution gives you an explicit right to raise concerns, and an equally explicit guarantee that doing so cannot be held against you or affect your treatment. Complaints are also, bluntly, how the system learns — trusts are required to analyse them, act on them and show regulators what changed. Staying silent protects nobody, including the next patient.

This guide maps every route, from a two-minute conversation to an independent national investigation — and covers saying thank you as well, because that matters too.

## While you are still in the department

Problems raised on the spot are the ones most likely to be fixed on the spot.

- **About your own care?** Talk to the clinician treating you. You are entitled to an explanation of any decision, to ask for a second opinion, and to decline treatment you do not want — our guide to [your rights in A&E](/guides/your-rights-in-ae/) sets these out fully.
- **About the department itself?** Waits stretching on with no updates, a confused elderly patient left struggling, an unpleasant interaction with a staff member — ask any nurse to point you to the **nurse in charge** of the shift. This is a normal, everyday request, and the coordinator has real authority to sort operational problems there and then. (Worth knowing: the four-hour standard you may have heard about is measured, published and trackable — see [how waits are measured](/guides/how-waits-are-measured/) and our [statistics pages](/statistics/) for context on what departments are actually achieving.)
- **Want someone outside the clinical team?** Ask for **PALS** — the Patient Advice and Liaison Service. Most hospitals have an office on site, typically open weekday office hours, staffed by people whose entire job is untangling patient concerns.

## After you are home: the informal route

**PALS** remains your best first port of call after the event, reachable by phone, email or letter — contact details live on each trust's website, and our [hospital directory](/hospitals/) links to every trust. PALS can pull your notes, speak to the staff involved, get you an explanation or an apology, arrange a sit-down with a senior clinician, and feed problems into the department's improvement work. A large share of concerns end satisfactorily here, usually within days rather than months, and using PALS never stops you escalating later if the answer disappoints.

You will probably also receive a **Friends and Family Test** text asking about your visit. Answer it honestly — the scores are collated and watched — but understand its limits: it is a thermometer, not a complaints process. Nobody investigates an individual survey response.

## Making it formal

When the issue is serious — a missed diagnosis, a safeguarding worry, treatment that felt unsafe, or an informal answer that did not hold water — the formal NHS complaints procedure exists for you.

### The ground rules

- **Deadline:** complaints should normally be lodged within **12 months** of the event or of your realising something was wrong; trusts can and do waive this for good reason, so a late complaint is still worth making
- **Who can complain:** you, or someone acting for you with consent — and relatives can complain on behalf of children, people who lack capacity, or someone who has died
- **Free help exists:** every area of England has an independent **NHS complaints advocacy service** that will help you draft, submit and pursue a complaint at no cost — search your council's name plus "NHS complaints advocacy," or ask PALS to point you to it

### Writing a complaint that gets results

Address it to the trust's complaints team (every trust website has a complaints page) and build it like this:

1. Your details, plus the date, rough time and department of the visit
2. A **timeline** of what happened — times, names or descriptions of staff, what was said and done, in order. Specifics are what investigators can check against records; "the nurse at about 3 am who refused to reposition my father, despite three requests over two hours" can be investigated, whereas "the staff didn't care" cannot
3. Facts first, feelings second — say how it affected you, but anchor everything to events
4. **What you want:** an apology, an explanation, evidence of changed practice, a corrected record. Naming the outcome makes it far easier to deliver
5. Keep copies of everything, and consider requesting your medical records too — [your rights guide](/guides/your-rights-in-ae/) explains how

### What the trust must then do

Acknowledge your complaint within **three working days**; investigate it properly (records review, staff statements); agree a response timescale with you — commonly in the range of 25 to 60 working days for anything complex — and send a written response answering each point, owning any failures, and setting out actions taken. If the deadline slips, they should tell you why and give a new one. Chase silence; do not absorb it.

## Not satisfied? Escalate

You can ask the trust for a **resolution meeting** — sitting down with senior staff often unlocks what letters cannot. If local resolution is exhausted and you remain unhappy, take the complaint to the **Parliamentary and Health Service Ombudsman (PHSO)**, the independent final tier for NHS complaints in England. The Ombudsman is free, does not act for the NHS, and can uphold complaints, order fresh action and require remedies. (Scotland, Wales and Northern Ireland each have their own public services ombudsman playing the same role.)

Two clarifications people often need:

- **Complaints and compensation are separate tracks.** The complaints process delivers explanations, apologies and change — not damages. If poor care caused you real harm, a clinical negligence solicitor is the route to compensation, and pursuing one track never blocks the other.
- **Complaints do not discipline individuals.** Staff conduct is handled through separate professional and HR processes — though a complaint can be what triggers them, and serious patient-safety incidents spark their own formal investigations with published learning.

## When the care was brilliant

The feedback system runs both ways, and positive feedback is scandalously under-supplied. A card naming the nurse who calmed your frightened child, an email to the department manager, a glowing Friends and Family response, a review on the NHS website — these get read out at handovers and pinned to staffroom walls, and in a service under strain they land harder than you would guess. If someone made your worst night easier, tell their department so.

## The short version

- Raise problems in the moment where possible — the nurse in charge and PALS can often fix things same-day
- PALS handles most concerns informally after the event; it costs nothing to start there
- Formal complaints: within 12 months, in writing, built on a specific timeline, ending with the outcome you want — acknowledgement due in three working days
- Free independent advocacy services exist to help you through it
- Final stop: the Parliamentary and Health Service Ombudsman
- Complaining is a protected right that cannot affect your care — and compliments deserve sending just as much
`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
