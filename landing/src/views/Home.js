import React from 'react';
// import section header
import SectionHeader from '../components/sections/partials/SectionHeader';
// import sections
import HeroSplit from '../components/sections/HeroSplit';
import Clients from '../components/sections/Clients';
import GenericSection from '../components/sections/GenericSection';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
// import some required elements
import Image from '../components/elements/Image';
import Modal from '../components/elements/Modal';

class Home extends React.Component {

  state = {
    videoModalActive: false
  }
  openModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: true });
  }

  closeModal = (e) => {
    e.preventDefault();
    this.setState({ videoModalActive: false });
  }

  render() {

    const genericSection01Header = {
      title: 'Reduce authentication time, increase reliability',
      paragraph: 'Our centralized verification platform allows developers to automatically check the validity of' +
      ' an email address with a simple API call. No more annoying verification codes and Captcha Guessing'
    }

    return (
      <React.Fragment>
        <HeroSplit className="illustration-section-01" />
        <Clients topDivider bottomDivider />
        <GenericSection topDivider className="center-content">
          <SectionHeader data={genericSection01Header} className="reveal-from-bottom" />
          <div className="reveal-from-bottom">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={this.openModal}
            >
              <Image
                src={require('./../assets/images/video-placeholder.svg')}
                alt="Video"
                width={712}
                height={400} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={this.state.videoModalActive}
            handleClose={this.closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </GenericSection>         
        <FeaturesTiles topDivider className="center-content" />
        <Testimonial topDivider />  
        <Cta split />
      </React.Fragment>
    );
  }
}

export default Home;