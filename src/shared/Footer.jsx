import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.siteFooter}>
      <div className={style.container}>
        <p>&copy; 2026 Chic Boutique. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
