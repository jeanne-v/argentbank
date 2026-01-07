import Hero from "../../components/Hero/Hero";
import Feature from "../../components/Feature/Feature";

import chatIcon from "../../assets/icon-chat.png";
import moneyIcon from "../../assets/icon-money.png";
import securityIcon from "../../assets/icon-security.png";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <Feature
          img={chatIcon}
          imgAlt="Chat Icon"
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
        />
        <Feature
          img={moneyIcon}
          imgAlt="Money Icon"
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be!"
        />
        <Feature
          img={securityIcon}
          imgAlt="Security Icon"
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money
            is always safe."
        />
      </section>
    </main>
  );
}
