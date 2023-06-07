

let currentLanguage = "en";

document.addEventListener("DOMContentLoaded", () => {
  loadLanguageFiles().then(() => {
    updateLanguage();
  });
});

async function loadLanguageFiles() {
  const enResponse = await fetch("./resume-en.json");
  const esResponse = await fetch("./resume-es.json");
  resume["en"] = await enResponse.json();
  resume["es"] = await esResponse.json();
}


function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
  
    const enBtn = document.getElementById("btnEnglish");
    const esBtn = document.getElementById("btnSpanish");
  
    if (currentLanguage === "en") {
      enBtn.disabled = true;
      esBtn.disabled = false;
    } else {
      enBtn.disabled = false;
      esBtn.disabled = true;
    }
  }

function createListItems(dataArray) {
    return dataArray.map((item) => `<li>${item}</li>`).join("");
  }
  
  function createExperienceListItems(dataArray) {
    return dataArray
      .map(
        (experience) =>
          `<li><strong>${experience.position} | ${experience.company}, ${experience.location}</strong><br>${experience.period}<br>${experience.responsibilities
            .map((responsibility) => `• ${responsibility}`)
            .join("<br>")}</li>`
      )
      .join("");
  }
  
  function createProjectListItems(dataArray) {
    return dataArray
      .map(
        (project) =>
          `<li><strong>${project.name}</strong><br>${project.role}<br>Tecnologías: ${project.technologies}</li>`
      )
      .join("");
  }
  
  function updateSection(sectionId, titleKey, infoKey, listItemsFn) {
    const lang = currentLanguage;
    const section = resume[lang][sectionId];
    document.getElementById(`${sectionId}Title`).innerHTML = section[titleKey];
    if (sectionId === "summary" || sectionId === "education"  || sectionId === "location" || sectionId === "languages"  ) {
        document.getElementById(`${sectionId}Info`).innerHTML = section[infoKey];
      } else {
        document.getElementById(`${sectionId}List`).innerHTML = listItemsFn(section[infoKey]);
      }
  }
  
  function updateLanguage() {
    updateSection("summary", "title", "info", (info) => info);
    updateSection("technicalSkills", "title", "info", createListItems);
    updateSection("professionalExperience", "title", "info", createExperienceListItems);
    updateSection("education", "title", "info", (info) => info);
    updateSection("certifications", "title", "info", createListItems);
    updateSection("projects", "title", "info", createProjectListItems);
    updateSection("languages", "title", "info", (info) => info);
    updateSection("location", "title", "info", (info) => info);
  }
