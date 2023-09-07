import style from "./intro.style.module.scss";

const joinSteps = [
  {
    id: "1",
    imgurl: "./intro/email.svg",
    imgalt: "Steps to join the community: register with email",
    title: "Register with your email",
    description: "Sign up for free. Fill the register form to become a member.",
  },
  {
    id: "2",
    imgurl: "./intro/profile.svg",
    imgalt: "Steps to join the community: Edit your profile",
    title: "Edit your profile",
    description:
      "Share your most remarkable characteristics and interests with the community.",
  },
  {
    id: "3",
    imgurl: "./intro/upload.svg",
    imgalt: "Steps to join the community: Upload your item",
    title: "Upload your item",
    description:
      "Members have access to a upload items form to share their music instruments.",
  },
  {
    id: "4",
    imgurl: "./intro/collection.svg",
    imgalt: "Steps to join the community: Display your item",
    title: "Display your item",
    description: "The public gallery will display your items.",
  },
];

export function Intro() {
  return (
    <section className={style.intro}>
      <h2 className={style.introTitle}>Steps to join the community</h2>

      <div className={style.introStepsContainer}>
        {joinSteps.map((item) => (
          <div key={item.id} className={style.introStepsCard}>
            <img
              className={style.cardImage}
              src={item.imgurl}
              alt={item.imgalt}
              width={100}
              height={100}
            ></img>
            <p className={style.cardTitle}>{item.title}</p>
            <p className={style.cardDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
