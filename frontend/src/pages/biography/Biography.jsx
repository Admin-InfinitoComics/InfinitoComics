const bio = {
  fullName: "Quick Vision Something",
  aliases: "Quick Vision Something",
  powers: "abcde, abced",
  weapons: "hsfhidejfbjskbc",
  height: "5' 10\"",
  weight: "80Kg",
  gender: "Male",
  age: "24",
  dob: "10/10/01",
  species: "Human",
  eyes: "Blue",
  hair: "Brown",
  placeOfOrigin: "abc",
  universe: "infinito 1",
  relationships: {
    family: [
      "Quick Vision Something mother",
      "Quick Vision Something mother",
      "Quick Vision Something mother",
    ],
    friends: [
      "Quick Vision Something mother",
      "Quick Vision Something mother",
      "Quick Vision Something mother",
    ],
    enemies: [
      "Quick Vision Something mother",
      "Quick Vision Something mother",
      "Quick Vision Something mother",
    ],
  },
  groupAffiliations: "Group 1",
  creator: ["ANSHIKA", "MANSHA", "ANUJ", "SUJAL"],
  quote:
    "He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.",
  about:
    "He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.",
  origin:
    "He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.",
  image:
    "https://static.wikia.nocookie.net/invincibleanimatedseries/images/2/2e/Battle_Beast.png", // Replace with your image
};

export default function Biography() {
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="tracking-widest font-bold text-xl md:text-2xl mb-8 text-center md:text-left">
          BIOGRAPHY
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-1/3 w-full">
            <div className="border border-gray-400 rounded p-6 bg-white">
              <div className="mb-4">
                <div className="text-xs text-gray-500">Full Name</div>
                <div className="font-medium">{bio.fullName}</div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-500">Other Aliases</div>
                <div className="font-medium">{bio.aliases}</div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-500">Powers</div>
                <div className="font-medium">{bio.powers}</div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-500">Weapons</div>
                <div className="font-medium">{bio.weapons}</div>
              </div>
              {/* Grid */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Height</div>
                  <div>{bio.height}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Age</div>
                  <div>{bio.age}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Species</div>
                  <div>{bio.species}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Weight</div>
                  <div>{bio.weight}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date of Birth</div>
                  <div>{bio.dob}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Eyes</div>
                  <div>{bio.eyes}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Gender</div>
                  <div>{bio.gender}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hair</div>
                  <div>{bio.hair}</div>
                </div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Place of Origin</div>
                <div>{bio.placeOfOrigin}</div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Universe</div>
                <div>{bio.universe}</div>
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Relationships</div>
                <div className="text-xs text-gray-500">Family</div>
                {bio.relationships.family.map((f, i) => (
                  <div key={i} className="italic">
                    {f}
                  </div>
                ))}
                <div className="text-xs text-gray-500 mt-1">Friends</div>
                {bio.relationships.friends.map((f, i) => (
                  <div key={i} className="italic">
                    {f}
                  </div>
                ))}
                <div className="text-xs text-gray-500 mt-1">Enemies</div>
                {bio.relationships.enemies.map((f, i) => (
                  <div key={i} className="italic">
                    {f}
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <div className="text-xs text-gray-500">Group Affiliations</div>
                <div>{bio.groupAffiliations}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Creator</div>
                <div className="text-pink-600 font-semibold tracking-widest text-xs">
                  {bio.creator.join(" , ")}
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="md:w-2/3 w-full">
            <div className="italic text-gray-500 text-base mb-6">
              “{bio.quote}”
            </div>
            <div className="mb-6">
              <div className="font-bold mb-1">About</div>
              <div className="text-gray-700 text-sm md:text-base">{bio.about}</div>
            </div>
            <div className="mb-6">
              <div className="font-bold mb-1">Origin</div>
              <div className="text-gray-700 text-sm md:text-base">{bio.origin}</div>
            </div>
            <div className="mb-6">
              <img
                src={bio.image}
                alt="character"
                className="w-full max-w-lg rounded mx-auto"
              />
            </div>
            <div className="text-gray-700 text-sm md:text-base space-y-3">
              <p>{bio.about}</p>
              <p>{bio.about}</p>
              <p>{bio.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}