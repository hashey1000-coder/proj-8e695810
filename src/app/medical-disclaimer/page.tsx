import Link from "next/link";
import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";

export const metadata: Metadata = {
  title: "Medical Disclaimer — AEWaitTimes Is Information, Not Advice",
  description:
    "AEWaitTimes provides waiting-time information only and is not medical advice. In a life-threatening emergency call 999; for urgent advice call NHS 111. How to use our figures safely.",
  alternates: { canonical: "/medical-disclaimer/" },
};

export default function MedicalDisclaimerPage() {
  return (
    <InfoPageShell
      breadcrumb="Medical disclaimer"
      title="Medical disclaimer"
      intro="AEWaitTimes is here to inform a decision about where to go — not to make a clinical one. Please read this before you rely on anything on the site."
    >
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-900">
        <p className="font-bold">
          If someone&apos;s life may be at risk, don&apos;t compare queues — call 999
          now.
        </p>
        <p className="mt-1.5 text-sm text-rose-800">
          Chest pain, signs of a stroke, heavy bleeding, difficulty breathing, loss
          of consciousness or a serious injury all need emergency help immediately.
          For urgent but non-emergency advice, call <strong>NHS 111</strong> (free,
          24/7) or use 111 online in England.
        </p>
      </div>

      <h2>Information, not medical advice</h2>
      <p>
        Everything on AEWaitTimes is general information about A&amp;E and urgent-care
        waiting times. It is <strong>not</strong> medical advice, diagnosis or
        treatment, and it is not a substitute for a qualified healthcare
        professional. We are not clinicians. Never delay seeking care, and never
        disregard professional advice, because of something you read here.
      </p>

      <h2>Waiting figures are a guide, not a guarantee</h2>
      <ul>
        <li>
          Figures are snapshots collected from public sources and can be out of date
          by the time you travel. Some are statistical <strong>estimates</strong>,
          clearly labelled as such.
        </li>
        <li>
          Patients are seen in order of <strong>clinical urgency</strong>, decided by
          triage on arrival — not by the posted wait or by who arrived first.
        </li>
        <li>
          A low figure doesn&apos;t mean a department is the right place for your
          problem, and a high one doesn&apos;t mean you should stay away if you need
          emergency care.
        </li>
      </ul>

      <h2>Deciding where to go</h2>
      <p>
        If you&apos;re unsure whether A&amp;E is the right choice, <strong>NHS 111</strong>{" "}
        can assess your situation and direct you — including to urgent treatment
        centres that often have shorter queues for minor injuries and illness. When
        in doubt about something serious, choose emergency care.
      </p>

      <h2>No liability</h2>
      <p>
        We work to keep the site accurate and current, but we can&apos;t guarantee
        every figure is correct or up to date at the moment you read it, and we
        accept no liability for decisions made on the basis of the information here.
        Use it as one input, alongside your own judgement and official NHS advice.
      </p>

      <p>
        See also our <Link href="/methodology">methodology</Link>,{" "}
        <Link href="/data-sources">data sources</Link> and{" "}
        <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </InfoPageShell>
  );
}
