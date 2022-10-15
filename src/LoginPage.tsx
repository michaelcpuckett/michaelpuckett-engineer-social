import React from 'react';

export function LoginPage({}) {
  return (
    <html lang="en">
      <head>
        <title>Private Login</title>
        <Styles />
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <aside>
          <small>
            Hi! This is my personal login for writing posts. You can
            see <a href="/actor/michael/outbox">all my posts here</a>.
          </small>
        </aside>
        <main>
          <h1>
            Private Login
          </h1>
          <LoginForm />
        </main>
      </body>
    </html>
  );
};

function LoginForm({ }) {
  return (
    <>
      <form noValidate id="LoginForm">
        <label>
          <span>Email</span>
          <input type="email" name="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" />
        </label>
        <button type="submit">
          Log In
        </button>
      </form>
      <script type="module" src="/LoginForm.js"></script>
    </>
  )
}

function Styles({ }) {
  return (
    <style>
      {`
        * {
          box-sizing: border-box;
        }
        :root {
          color-scheme: dark light;
          min-height: 100%;
        }
        body {
          font-family: system-ui, sans-serif;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }
        main {
          display: grid;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        h1 {
          font-weight: normal;
          text-align: center;
        }
        h2 {
          font-weight: normal;
        }
        form {
          display: flex;
          gap: 20px;
          flex-direction: column;
          width: 320px;
          border: 1px solid;
          border-radius: 6px;
          padding: 20px;
        }
        label {
          display: flex;
          gap: 12px;
          width: 100%;
          flex-direction: column;
        }
        label span {
          display: flex;
          width: 100px;
        }
        input {
          width: 100%;
          border: 1px solid;
          box-shadow: 0;
          border-radius: 6px;
          padding: 6px;
          font: inherit;
          line-height: inherit;
          text-align: center;
        }
        button {
          appearance: none;
          border-radius: 6px;
          padding: 12px 6px;
          background: Canvas;
          border: 1px solid;
          font: inherit;
          line-height: inherit;
        }
        aside {
          text-align: center;
          padding: 20px;
          display: inline-flex;
        }
      `}
    </style>
  );
}

function SignUpForm({ }) {
  return (
    <>
      <form noValidate id="SignUpForm">
        <label>
          <span>Email</span>
          <input type="email" name="email" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" />
        </label>
        <label>
          <span>Username</span>
          <input type="text" name="preferredUsername" />
        </label>
        <label>
          <span>Name</span>
          <input type="text" name="name" />
        </label>
        <button type="submit">
          Sign Up
        </button>
      </form>
      <script type="module" src="/SignUpForm.js"></script>
    </>
  )
}