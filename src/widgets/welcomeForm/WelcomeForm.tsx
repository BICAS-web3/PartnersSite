import s from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import bgImg from "@/public/media/initPageImages/formEllipse.png";
import mailIco from "@/public/media/footerImages/mailIco.png";
import tgIco from "@/public/media/footerImages/tgIco.png";
import twitterIco from "@/public/media/footerImages/twitterIco.png";
import * as Api from "@/shared/api";

import clsx from "clsx";

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

interface WelcomeFormProps {}

export const WelcomeForm: FC<WelcomeFormProps> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState(false);
  const [notValidMail, setNotValidMail] = useState(false);
  const [start, setStart] = useState(false);

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (notValidMail) {
      setTimeout(() => {
        setNotValidMail(false);
      }, 2000);
    }
  }, [notValidMail]);

  const [showLine, setShowLine] = useState(false);
  const [requestDone, setRequestDone] = useState(false);
  useEffect(() => {
    (async () => {
      if (start) {
        const request = await Api.submitQuestion({
          name: name,
          email: email,
          message: message,
        });
        if (request.status === "OK") {
          setName("");
          setEmail("");
          setMessage("");
          setStart(false);
          setRequestDone(true);
        }
      }
    })();
  }, [start]);

  useEffect(() => {
    if (requestDone) {
      const timeout = setTimeout(() => {
        setRequestDone(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [requestDone]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError((prev) => !prev);
      }, 2000);
    }
  }, [error]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 650) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className={s.welcome_form_section}>
      <img src={bgImg.src} alt="bg-ellipse" className={s.bg_img} />
      <div className={s.welcome_form_block}>
        <div className={clsx(s.welcome_form_info, s.is_desktop)}>
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
              className={clsx(
                s.form_input,
                "default_input",
                error && !name && s.error_input
              )}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={notValidMail ? "Not valid email" : "Your email"}
              className={clsx(
                s.form_input,
                "default_input",
                error && !email && s.error_input,
                notValidMail && s.error_input
              )}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <textarea
              name="question_id"
              placeholder="Enter your question"
              className={clsx(s.textarea, error && !message && s.error_input)}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>

            <div className={s.btn_wrapp}>
              {" "}
              <div
                className={clsx(s.form_header_social_media_list, s.is_mobile)}
              >
                {smediaList.map((item, ind) => (
                  <div
                    key={ind}
                    className={s.form_header_social_media_list_item}
                  >
                    <img src={item.ico.src} alt="title" />
                    <span
                      className={s.form_header_social_media_list_item_title}
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className={clsx(s.submit_btn, requestDone && s.animation)}
                onClick={() => {
                  if (!name || !email || !message) {
                    setError(true);
                  } else if (validateEmail(email) === false) {
                    setNotValidMail(true);
                    setEmail("");
                  } else {
                    setStart(true);
                  }
                }}
              >
                {requestDone ? "Thanks for contacting us" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
