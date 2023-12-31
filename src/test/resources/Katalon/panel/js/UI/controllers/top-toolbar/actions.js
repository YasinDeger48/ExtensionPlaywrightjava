import { findTestSuiteById } from "../../services/data-service/test-suite-service.js";
import { getSelectedSuite } from "../../view/testcase-grid/selected-suite.js";
import { setLoginOrSignup } from "../../../../../content-marketing/panel/login-inapp.js";

async function logout() {
  let result = await browser.storage.local.get("segment");
  let checkedResult = await browser.storage.local.get("checkLoginData");
  if (result.segment.user && checkedResult.checkLoginData.isActived) {
    result.segment.user = "";
    browser.storage.local.set(result);

    checkedResult.checkLoginData.isActived = false;
    browser.storage.local.set(checkedResult);

    $("#login-user").hide();
    $("#login-button").show();
  }

  // Reset katone_access_token for TestOps
  updateTestOpsLoginToken();
}

$(() => {
  let setLoginTokenTimeout;

  $("#play").click(function (e) {
    const selectedTestSuite = getSelectedSuite();
    const testSuite = findTestSuiteById(selectedTestSuite.id);
    if (testSuite.status && testSuite.status === "dynamic") {
      $("#playSuite").click();
    } else {
      $("#playback").click();
    }
  });

  $("#btn-drd-play").click(() => {
    $("#dropdown-play")
      .css({
        "min-width": "140px",
        top: "35px",
        right: "-40px",
      })
      .toggle();
  });

  // $('#playback').click(function(e) {
  //     $('#dropdown-play').hide();
  // });

  $("#playSuite").click(function (e) {
    $("#dropdown-play").hide();
  });

  $("#playSuites").click(function (e) {
    $("#dropdown-play").hide();
  });

  // sign in again on startup
  browser.storage.local.get("segment").then(async (result) => {
    let checkedResult = await browser.storage.local.get("checkLoginData");
    if (
      result.segment &&
      result.segment.user &&
      checkedResult.checkLoginData &&
      checkedResult.checkLoginData.isActived
    ) {
      $("#login-user").show();
      $("#login-button").hide();
      $("#logout-info").html(result.segment.user);
    }
  });

  browser.storage.onChanged.addListener(async (changes, areaName) => {
    let result = await browser.storage.local.get("segment");

    if (Object.keys(changes).includes("checkLoginData")) {
      if (result.segment.user && changes.checkLoginData.newValue.isActived) {
        $("#login-user").show();
        $("#login-button").hide();
        $("#logout-info").html(result.segment.user);

        // If sign in successful, set timeout for signing out
        // automatically when login token expired (7 days)
        setLoginTokenTimeout = setTimeout(async () => {
          logout();
        }, 7 * 24 * 60 * 60 * 1000);
      }
    }
  });

  $("#login-button").click(() => {
    setLoginOrSignup();
    $("#signup").hide();
    $("#signin").show();
  });

  $("#login-user").click(() => {
    $("#logout-dropdown").toggle();
  });

  $("#logout-user").click(() => {
    // Clear timeout on signing out manually
    clearTimeout(setLoginTokenTimeout);

    logout();
    $("#logout-dropdown").toggle();
  });
});
