import React from 'react';

export function LoginPage({}) {
  return (
    <html lang="en">
      <head>
        <title>Private Login</title>
        <link rel="stylesheet" href="/LoginPage.css" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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