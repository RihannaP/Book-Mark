/**
 * @jest-environment jsdom
 */

import { updateBookmarkList } from "./script.js";
// import "@testing-library/jest-dom";

describe("updateBookmarkList", () => {
  let bookmarkList;

  beforeEach(() => {
    // Set up the document body with an empty UL element
    document.body.innerHTML = `<ul id="bookmark-list"></ul>`;
    bookmarkList = document.getElementById("bookmark-list");
  });

  test("renders bookmarks correctly", () => {
    const bookmarks = [
      { url: "https://example.com", title: "Example", description: "Test bookmark", timestamp: 1700000000000 },
      { url: "https://google.com", title: "Google", description: "Search Engine", timestamp: 1700000100000 },
    ];

    updateBookmarkList(bookmarks);

    const listItems = bookmarkList.querySelectorAll("li");
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain("Google");
    expect(listItems[0].textContent).toContain("Search Engine");
    expect(listItems[1].textContent).toContain("Example");
    expect(listItems[1].textContent).toContain("Test bookmark");
  });

  test("appends timestamps correctly", () => {
    const bookmarks = [{ url: "https://example.com", title: "Example", description: "Test", timestamp: 1700000000000 }];

    updateBookmarkList(bookmarks);
    expect(bookmarkList.innerHTML).toContain("Added on:");
  });

  test("handles missing timestamp gracefully", () => {
    const bookmarks = [{ url: "https://example.com", title: "Example", description: "Test", timestamp: null }];

    updateBookmarkList(bookmarks);
    expect(bookmarkList.innerHTML).toContain("Invalid Date");
  });
});