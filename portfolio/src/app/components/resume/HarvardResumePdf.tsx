import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ResumeJob, ResumeModel } from "@/app/lib/resume";

/**
 * Classic Harvard CV — US Letter 8.5×11 in (612×792 pt), exactly 2 pages.
 * wrap must stay true so react-pdf keeps full Letter MediaBox (not content-hug).
 */
const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#000000",
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 50,
    lineHeight: 1.12,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 15.5,
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  headline: {
    fontFamily: "Times-Italic",
    fontSize: 10.5,
    textAlign: "center",
    marginBottom: 6,
  },
  contact: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 2,
  },
  location: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 10,
  },
  contactLink: {
    fontSize: 9,
    color: "#000000",
    textDecoration: "none",
  },
  contactSep: {
    fontSize: 9,
  },
  section: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    letterSpacing: 1.4,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 1.5,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionFirst: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    letterSpacing: 1.4,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 1.5,
    marginTop: 0,
    marginBottom: 4,
  },
  summary: {
    fontSize: 9.5,
    textAlign: "justify",
    lineHeight: 1.15,
    marginBottom: 2,
  },
  jobHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 5,
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    flex: 1,
    paddingRight: 8,
  },
  jobDate: {
    fontSize: 9,
    textAlign: "right",
  },
  jobLead: {
    fontSize: 9.5,
    marginBottom: 2,
    lineHeight: 1.12,
  },
  nested: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    marginTop: 4,
    marginBottom: 1.5,
  },
  bulletRow: {
    flexDirection: "row",
    paddingLeft: 8,
    marginBottom: 1.5,
  },
  bulletDot: {
    width: 9,
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.15,
  },
  stack: {
    fontSize: 8.5,
    marginTop: 3,
    marginBottom: 1,
    lineHeight: 1.12,
  },
  projectTitle: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    marginTop: 3,
    marginBottom: 1.5,
  },
  lineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2.5,
  },
  lineLeft: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    flex: 1,
    paddingRight: 8,
  },
  lineRight: {
    fontSize: 9,
    textAlign: "right",
  },
  lineSub: {
    fontSize: 9,
    marginTop: 1,
    marginBottom: 1.5,
    lineHeight: 1.12,
  },
  skill: {
    fontSize: 9,
    marginBottom: 1.5,
    lineHeight: 1.12,
  },
  skillLabel: {
    fontFamily: "Times-Bold",
  },
  lang: {
    fontSize: 9.5,
    marginTop: 1,
  },
  jobBlock: {
    marginBottom: 3,
  },
  projectBlock: {
    marginBottom: 3,
  },
});

type Labels = {
  profile: string;
  education: string;
  programs: string;
  experience: string;
  projects: string;
  skills: string;
  honors: string;
  certifications: string;
  languages: string;
  nestedProjectPrefix: string;
};

type Props = {
  resume: ResumeModel;
  labels: Labels;
};

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </>
  );
}

function JobBlock({
  job,
  projectPrefix,
}: {
  job: ResumeJob;
  projectPrefix: string;
}) {
  const [lead, ...rest] = job.bullets;
  const hasNested = Boolean(job.nestedProjects?.length);

  return (
    <View style={styles.jobBlock}>
      <View style={styles.jobHead} wrap={false}>
        <Text style={styles.jobTitle}>
          {job.role} — {job.org}
        </Text>
        <Text style={styles.jobDate}>{job.period}</Text>
      </View>
      {hasNested && lead ? (
        <Text style={styles.jobLead}>{lead}</Text>
      ) : (
        <Bullets items={job.bullets} />
      )}
      {hasNested ? <Bullets items={rest} /> : null}
      {job.nestedProjects?.map((p) => (
        <View key={p.title}>
          <Text style={styles.nested}>
            {projectPrefix} {p.title}
          </Text>
          <Bullets items={p.bullets} />
        </View>
      ))}
      {job.footerBullets?.map((line) => (
        <Text key={line} style={styles.stack}>
          {line}
        </Text>
      ))}
    </View>
  );
}

export function HarvardResumePdf({ resume, labels }: Props) {
  return (
    <Document title={`${resume.name} — CV`} author={resume.name}>
      <Page size="LETTER" style={styles.page} wrap>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.headline}>{resume.headline}</Text>
        <Text style={styles.contact}>
          {resume.contacts.map((item, index) => (
            <Text key={item.href}>
              {index > 0 ? <Text style={styles.contactSep}> · </Text> : null}
              <Link src={item.href} style={styles.contactLink}>
                {item.label}
              </Link>
            </Text>
          ))}
        </Text>
        {resume.location ? (
          <Text style={styles.location}>{resume.location}</Text>
        ) : (
          <View style={{ marginBottom: 10 }} />
        )}

        <Text style={styles.sectionFirst}>{labels.profile.toUpperCase()}</Text>
        {resume.summary.split(/\n\n+/).map((paragraph) => (
          <Text key={paragraph.slice(0, 40)} style={styles.summary}>
            {paragraph}
          </Text>
        ))}

        <Text style={styles.section}>{labels.experience.toUpperCase()}</Text>
        {resume.experience.map((job) => (
          <JobBlock
            key={`${job.org}-${job.period}`}
            job={job}
            projectPrefix={labels.nestedProjectPrefix}
          />
        ))}
      </Page>

      <Page size="LETTER" style={styles.page} wrap>
        <Text style={styles.sectionFirst}>{labels.projects.toUpperCase()}</Text>
        {resume.projects.map((project) => (
          <View key={project.title} style={styles.projectBlock}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Bullets items={project.bullets} />
          </View>
        ))}

        <Text style={styles.section}>{labels.education.toUpperCase()}</Text>
        {resume.education.map((item) => (
          <View key={item.left} wrap={false}>
            <View style={styles.lineRow}>
              <Text style={styles.lineLeft}>{item.left}</Text>
              <Text style={styles.lineRight}>{item.right}</Text>
            </View>
            {item.sub ? <Text style={styles.lineSub}>{item.sub}</Text> : null}
          </View>
        ))}

        {resume.programs.length > 0 ? (
          <>
            <Text style={styles.section}>{labels.programs.toUpperCase()}</Text>
            {resume.programs.map((item) => (
              <View key={item.left} wrap={false}>
                <View style={styles.lineRow}>
                  <Text style={styles.lineLeft}>{item.left}</Text>
                  <Text style={styles.lineRight}>{item.right}</Text>
                </View>
                {item.sub ? <Text style={styles.lineSub}>{item.sub}</Text> : null}
              </View>
            ))}
          </>
        ) : null}

        <Text style={styles.section}>{labels.skills.toUpperCase()}</Text>
        {resume.skills.map((item) => (
          <Text key={item.left} style={styles.skill}>
            <Text style={styles.skillLabel}>{item.left}: </Text>
            {item.sub}
          </Text>
        ))}

        {resume.certifications.length > 0 ? (
          <>
            <Text style={styles.section}>
              {labels.certifications.toUpperCase()}
            </Text>
            {resume.certifications.map((item) => (
              <View key={item.left} wrap={false}>
                <View style={styles.lineRow}>
                  <Text style={styles.lineLeft}>{item.left}</Text>
                  <Text style={styles.lineRight}>{item.right}</Text>
                </View>
                {item.sub ? <Text style={styles.lineSub}>{item.sub}</Text> : null}
              </View>
            ))}
          </>
        ) : null}

        {resume.honors.length > 0 ? (
          <>
            <Text style={styles.section}>{labels.honors.toUpperCase()}</Text>
            <Bullets items={resume.honors} />
          </>
        ) : null}

        {resume.languages.length > 0 ? (
          <>
            <Text style={styles.section}>{labels.languages.toUpperCase()}</Text>
            <Text style={styles.lang}>{resume.languages.join(" · ")}</Text>
          </>
        ) : null}
      </Page>
    </Document>
  );
}
