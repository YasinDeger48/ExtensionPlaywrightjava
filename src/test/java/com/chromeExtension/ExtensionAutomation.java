package com.chromeExtension;

import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class ExtensionAutomation {

    public static void main(String[] args) {

        Path extpath = Paths.get("/Users/values/Desktop/ExtensionAutomationWithPlaywright/src/test/resources/Katalon");
        Playwright playwright = Playwright.create();
        List<String> chromeArgs = new ArrayList<>();
        chromeArgs.add("--disable-background-timer-throttling");
        chromeArgs.add("--disable-backgrounding-occluded-windows");
        chromeArgs.add("--disable-renderer-backgrounding");
        chromeArgs.add("--no-sandbox");
        chromeArgs.add("--load-extension=" + extpath);
        chromeArgs.add("--disable-extensions-except=" + extpath);
        //chromeArgs.add("--headless=new");
        BrowserType.LaunchPersistentContextOptions lp =
                new BrowserType.LaunchPersistentContextOptions();

        //lp.setChannel("chrome");
        lp.setHeadless(false);
        lp.args = chromeArgs;
        Path path = Paths.get("target", "Context Data");
        BrowserContext browser = playwright.chromium()
                .launchPersistentContext(path, lp);
        Page page = browser.newPage();
        page.navigate("https://www.linkedin.com/in/yasindeger/");
        waitFor(10);
        page.close();
    }


    public static void waitFor(long second){
        try{
            Thread.sleep(second*1000);
        }catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
