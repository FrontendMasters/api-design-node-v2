import createApiSpec from "~/apiSpecs";
import { Song } from "./song.model";
import { User } from "./user/user.model";
import { runQuery, dropDb } from '../../../../test/helpers'
import { expect } from "chai";

createApiSpec(Song, "song", {
  title: "downtown jamming",
  url: "http://music.mp3"
});

describe("Song", () => {
  let user;
  beforeEach(async () => {
    await dropDb();
    user = await User.create({ username: "stu1", passwordHash: "123" });
  });

  afterEach(async () => {
    await dropDB();
  });

  it.only("should create a song", async () => {
    const result = await runQuery(
      `
      mutation CreateNewSong($input: NewSong!) {
        song: newSong(input: $input) {
          id
          title
        }
      }
    `,
      {
        input: {
          title: "Drop down",
          url: "http://drop.mp3",
          artist: "JJ"
        }
      },
      user
    );

    expect(result.errors).to.not.exist;
    expect(result.data.song).to.exist
    expect(result.data.song.title).to.equal('Drop down')

  });
});
