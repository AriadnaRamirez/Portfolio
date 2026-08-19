import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ResumeJob, ResumeModel } from "@/app/lib/resume";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    color: "#111111",
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 42,
    lineHeight: 1.32,
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 1.6,
  },
  headline: {
    textAlign: "center",
    fontSize: 11.5,
    fontFamily: "Times-Italic",
    marginTop: 6,
  },
  location: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 6,
  },
  contact: {
    textAlign: "center",
    fontSize: 10,
    marginTop: 3,
  },
  headerRule: {
    height: 1,
    backgroundColor: "#111111",
    marginTop: 8,
    marginBottom: 10,
  },
  awardsLead: {
    fontFamily: "Times-Bold",
    marginTop: 6,
    marginBottom: 3,
  },
  summary: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 3,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitleTight: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 2,
    marginTop: 6,
    marginBottom: 3,
  },
  sectionTitleFirst: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: "#111111",
    paddingBottom: 3,
    marginTop: 0,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  strong: {
    fontFamily: "Times-Bold",
  },
  rowTitle: {
    fontFamily: "Times-Bold",
    flexGrow: 1,
    flexShrink: 1,
    paddingRight: 8,
  },
  date: {
    fontSize: 10,
    textAlign: "right",
    flexShrink: 0,
  },
  job: {
    marginBottom: 8,
  },
  nestedTitle: {
    fontFamily: "Times-BoldItalic",
    marginTop: 6,
    marginBottom: 2,
  },
  bullet: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 1,
    paddingLeft: 10,
  },
  bulletMark: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  eduBlock: {
    marginBottom: 3,
  },
  skillLine: {
    marginBottom: 1,
  },
});

type Labels = {
  profile: string;
  education: string;
  experience: string;
  projects: string;
  skills: string;
  honors: string;
  certifications: string;
  languages: string;
};

type HarvardResumePdfProps = {
  resume: ResumeModel;
  labels: Labels;
};

function SectionTitle({
  children,
  first = false,
  tight = false,
}: {
  children: string;
  first?: boolean;
  tight?: boolean;
}) {
  const style = first
    ? styles.sectionTitleFirst
    : tight
      ? styles.sectionTitleTight
      : styles.sectionTitle;
  return <Text style={style}>{children.toUpperCase()}</Text>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((bullet) => (
        <View key={bullet} style={styles.bullet}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </>
  );
}

function Job({ job }: { job: ResumeJob }) {
  return (
    <View style={styles.job}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>
          {job.role} — {job.org}
        </Text>
        <Text style={styles.date}>{job.period}</Text>
      </View>
      <Bullets items={job.bullets} />
      {job.nestedProjects?.map((project) => (
        <View key={project.title}>
          <Text style={styles.nestedTitle}>{project.title}</Text>
          <Bullets items={project.bullets} />
        </View>
      ))}
    </View>
  );
}

export function HarvardResumePdf({ resume, labels }: HarvardResumePdfProps) {
  return (
    <Document
      title={`${resume.name} — ${resume.headline}`}
      author={resume.name}
    >
      <Page size="LETTER" wrap={false} style={styles.page}>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.headline}>{resume.headline}</Text>
        <Text style={styles.location}>{resume.location}</Text>
        <Text style={styles.contact}>{resume.contactLine}</Text>
        <View style={styles.headerRule} />
        <SectionTitle first>{labels.profile}</SectionTitle>
        <Text style={styles.summary}>{resume.summary}</Text>
        <Text style={styles.awardsLead}>{resume.awardsLead}</Text>
        <Bullets items={resume.awards} />
        <SectionTitle>{labels.experience}</SectionTitle>
        {resume.experience.map((job) => (
          <Job key={`${job.org}-${job.period}`} job={job} />
        ))}
      </Page>

      <Page size="LETTER" wrap={false} style={styles.page}>
        <SectionTitle first>{labels.projects}</SectionTitle>
        {resume.projects.map((project) => (
          <View key={project.title} style={styles.job}>
            <Text style={styles.strong}>{project.title}</Text>
            <Bullets items={project.bullets} />
          </View>
        ))}

        <SectionTitle tight>{labels.education}</SectionTitle>
        {resume.education.map((item) => (
          <View key={item.left} style={styles.eduBlock}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{item.left}</Text>
              <Text style={styles.date}>{item.right}</Text>
            </View>
            {item.sub ? <Text>{item.sub}</Text> : null}
          </View>
        ))}

        <SectionTitle tight>{labels.skills}</SectionTitle>
        {resume.skills.map((item) => (
          <Text key={item.left} style={styles.skillLine}>
            <Text style={styles.strong}>{item.left}: </Text>
            {item.sub}
          </Text>
        ))}

        <SectionTitle tight>{labels.certifications}</SectionTitle>
        {resume.certifications.map((item) => (
          <View key={item.left} style={styles.eduBlock}>
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{item.left}</Text>
              <Text style={styles.date}>{item.right}</Text>
            </View>
            {item.sub ? <Text>{item.sub}</Text> : null}
          </View>
        ))}

        <SectionTitle tight>{labels.honors}</SectionTitle>
        <Bullets items={resume.honors} />

        <SectionTitle tight>{labels.languages}</SectionTitle>
        <Text>{resume.languages.join("  •  ")}</Text>
      </Page>
    </Document>
  );
}
