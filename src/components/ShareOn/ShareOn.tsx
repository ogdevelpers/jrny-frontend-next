import './ShareOn.css';

const ShareOn = ()=> {
    return (
        <>
        <section className="share-on-box">
            <span className="share-on-span">Share On</span>
            <div className="share-icons">
                <ShareImg src='/favicon/whatsapp.svg' / >
                <ShareImg src='/favicon/linkedin.svg' / >
                <ShareImg src='/favicon/facebook.svg' / >
            </div>
        </section>
        </>
    )
}

function ShareImg({ src }: { src: string; }) {
    return (
        <button className="share-icon-button plus-button">
            <img src={`${src}`} alt="" />
        </button>
    );
}

export default ShareOn;