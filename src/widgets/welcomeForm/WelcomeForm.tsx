import s from "./styles.module.scss";
import { FC, useState } from "react";
import bgImg from "@/public/media/initPageImages/formEllipse.png";
import mailIco from "@/public/media/footerImages/mailIco.png";
import tgIco from "@/public/media/footerImages/tgIco.png";
import twitterIco from "@/public/media/footerImages/twitterIco.png";
import * as Api from "@/shared/api";

const smediaList = [
  {
    ico: mailIco,
    title: "affiliate@greekkeepers.io",
  },
  {
    ico: tgIco,
    title: "t.me/greekkeepers",
  },
  {
    ico: twitterIco,
    title: "twitter.com/GreekKeepers",
  },
];

interface WelcomeFormProps { }

export const WelcomeForm: FC<WelcomeFormProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  return (
    <div className={s.welcome_form_section}>
      <img src={bgImg.src} alt="bg-ellipse" className={s.bg_img} />
      <div className={s.welcome_form_block}>
        <div className={s.welcome_form_info}>
          <div className={s.form_info_header}>
            <h1 className={s.form_title}>We&apos;re here to help</h1>
            <p className={s.form_text}>
              Send us your questions, and we&apos;ll reply <br /> by 12 hours.
            </p>
          </div>
          <div className={s.form_header_social_media_list}>
            {smediaList.map((item, ind) => (
              <div key={ind} className={s.form_header_social_media_list_item}>
                <img src={item.ico.src} alt="title" />
                <span className={s.form_header_social_media_list_item_title}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.welcome_form_wrap}>
          <div className={s.form_info_header_clone}>
            <h1 className={s.form_title}>We&apos;re here to help</h1>
            <p className={s.form_text}>
              Send us your questions, and we&apos;ll reply <br /> by 12 hours.
            </p>
          </div>
          <div className={s.welcome_form}>
            <input
              type="text"
              placeholder="Your name"
              className={`${s.form_input} default_input`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Your email"
              className={`${s.form_input} default_input`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <textarea
              name="question_id"
              placeholder="Enter your question"
              className={`${s.textarea}`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <button
              className={s.submit_btn}
              onClick={() => {
                Api.submitQuestion({
                  name: name,
                  email: email,
                  message: message
                });
                setName("");
                setEmail("");
                setMessage("");
              }

              }
            >Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
