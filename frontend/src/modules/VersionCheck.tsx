import type { Versions } from "./Enums";
import type { Course } from "./Types";

console.log(versionCheck, upgrade); //TODO: remove

function versionCheck(newVersion: Versions) {
    const sharedCompatibility = getSharedCompatibility(newVersion);
    if (!sharedCompatibility) return false;

    return sharedCompatibility.includes(newVersion)
}

// returns array of other supported versions 
// CAUTION: must be updated every version rollout
function getSharedCompatibility(newVersion: Versions) {
    if ([
        'pre0_1',
        'pre0_2'
    ].includes(newVersion)) {
        return [newVersion];
    }

    // if more versions come in that are compatible with other versions, add cross compatibility here
}

function upgrade(newVersion: Versions) {
    switch(newVersion) {
        case 'pre0_1':
            return pre0_1Topre_2;
    }
}

function pre0_1Topre_2(course: Course) {
    // TODO: add strength difference
    console.log(course);
}