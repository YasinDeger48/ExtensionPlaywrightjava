let htmlWhatsnews = `
    <div class="header">
      <div class="title">Katalon Recorder 5.9.0</div>
    </div>
    <div class="content">
      <div class="message">
        <ul>
          <li><strong><b>New features</b></strong><br>
            <ul>
              <li>Introduced options to import Selenium 4 test scripts into Recorder and export test scripts from Recorder to Selenium 4 languages: Java, Python, C#, Ruby.</li>
              <li>Introduced the new collapsible navigation bar.</li>
              <li>Introduced options to navigate between cells using <i>Tab</i> key and <i>Shift + Tab</i> key.</li>
              <li>Introduced the ability to import Global Variables profiles into Recorder.</li>
            </ul>
          </li>
          <li><strong><b>Improvements</b></strong>
            <ul>
              <li>[TestOps integration]:
                <ul>
                  <li>When clicking on the TestOps <b>Dashboard</b> in Recorder, if you have an active Katalon session, Recorder will bypass the authentication step and direct you to the Projects section immediately.</li>
                  <li>When executing a test with your browser open to a TestOps tab, Recorder automatically opens a new tab for execution.</li>
                </ul>
              </li>
              <li>Added 4 new sample projects.</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
    <button id="whats-news-release-note">Release note</button>
    <button id="whats-news-close">Close</button>
    </div>
`;

function displayWhatsNewDialog() {
  let newsDialog = $("<div id='whatsNews'></div>")
    .html(htmlWhatsnews)
    .dialog({
      title: `Everything is up to date`,
      resizable: true,
      autoOpen: true,
      dialogClass: 'newStyleDialog',
      height: "auto",
      width: "500",
      modal: true,
      open: function () {
        $(this.parentElement.childNodes[0]).css("display", "block");
      }
    });
  $("#whats-news-release-note").click(() => {
    window.open(
      "https://docs.katalon.com/katalon-recorder/docs/release-notes.html"
    );
  });
  $("#whats-news-close").click(() => {
    newsDialog.remove();
  })
}

$(document).ready(function () {
  browser.storage.local.get("tracking").then(function (result) {
    if (result.tracking) {
      if (result.tracking.isUpdated
        && (result.tracking.hasShownWhatsNewDialog === undefined
          || result.tracking.hasShownWhatsNewDialog === false)) {
        displayWhatsNewDialog();
        result.tracking.hasShownWhatsNewDialog = true;
        browser.storage.local.set(result);
      }
    }
  });
});
