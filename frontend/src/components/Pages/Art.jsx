import React, { Component } from "react";
import JumpingHopper from "../forArt/JumpingHopper.jsx";

class Art extends Component {
  constructor() {
    super();
    this.underwaterDiv = React.createRef();
    this.state = {
      scrollToUnderwater: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.scrollToUnderwater &&
      !prevState.scrollToUnderwater &&
      this.underwaterDiv.current
    ) {
    //   setTimeout(() => { this.underwaterDiv.current.scrollIntoView({ behavior: "smooth", block: "start" })}
    //   , 2000);

      // Optionally, reset the flag if you only want to scroll once
      this.setState({ scrollToUnderwater: false });
    }
  }

  render() {
    return (
      <article id="art">
        <JumpingHopper setScrollToUnderwater={(val) => this.setState({ scrollToUnderwater: val })} />

        <div
          ref={this.underwaterDiv}
          className="z-10 min-h-160 w-full bg-cover bg-no-repeat bg-center bg-[url(wheedit-empty2.jpg)]"
        />

        <div className="min-h-200 min-w-full bg-[linear-gradient(rgba(0,18,26,0.9),rgba(0,0,0,1)),url(wheedit-empty2.jpg)]" />
      </article>
    );
  }
}

export default Art;
