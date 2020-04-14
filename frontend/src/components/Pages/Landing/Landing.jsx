import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Landing.scss";

const Landing = props => {
  return (
    <>
      <div class="hero">
        <div class="hero-content">
          <p>
            <span class="tagline">
              Welcome to <span class="logo-txt">terrazzo</span>! A better way
              for students to learn.
            </span>
          </p>
          <p>
            <Button type="primary" size="large" shape="round">
              <Link to="/sign-up/">Sign up now!</Link>
            </Button>
          </p>
        </div>
      </div>
      <div class="app-desc">
        <span class="logo-txt">terrazzo</span> is an education platform that
        harnesses the power of machine learning to provide students and
        professors insights about how they're learning. Using topic-modelling
        techniques, <span class="logo-txt">terrazzo</span> identifies the
        underlying course topics assignment and exam questions cover, allowing
        feedback on what students are <i>really</i> learning and where they need
        to improve, not just how many points they got on a question. Try it for
        your course today! (Or ask your professor to.)
      </div>
    </>
  );
};

export default Landing;
