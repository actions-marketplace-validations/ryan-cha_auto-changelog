import { info, getInput, setOutput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { generate } from "./changelog";

const SEMVER_REGEX = /^v([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;

async function run() {
  try {
    const token = getInput("token", { required: true });
    const exclude = getInput("exclude", { required: false }).split(",");
    const octokit = getOctokit(token);
    const {
      repo: { owner, repo },
      sha,
    } = context;

    // fetch tags
    const { data: tags } = await octokit.repos.listTags({
      owner,
      repo,
      per_page: 2,
    });

    // filter only version tags
    const versionTags = tags.filter((t) => SEMVER_REGEX.test(t.name));

    let olderTag;

    if (versionTags.length > 1) {
      // exclude the latest(auto-bumped) tag and choose older one.
      olderTag = versionTags[1];
    } else {
      olderTag = versionTags[0];
    }
    const newerTag = versionTags[0];

    info(
      `${olderTag.name}(${olderTag.commit.sha}) <  <= ${newerTag.name}(${newerTag.commit.sha})`,
    );

    const changelog = await generate(
      octokit,
      exclude,
      owner,
      repo,
      olderTag.commit.sha,
      `${olderTag.name}...${newerTag.name}`,
    );

    info(changelog);

    setOutput("changelog", changelog);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
