const Person = require("../models/personsModel");
const Announcement = require("../models/announcementsModel");
const Questionary = require("../models/questionaryModel");
const bcrypt = require("bcrypt");

//let dPerson = req.body.documentPerson
//let nAnnouncement = req.body.nameAnnouncement

const RegisterToAnnouncement = async (req, res) => {
    // const {
    //     documentPerson,
    // } = req.body

    //const documentPerson = "999021"
    //const nameAnnouncement = "Desarrollador Back End"

    const {
        idStudent,
        idAnnouncement,
        birthdate,
        gender,
        document,
        course,
        sena,
        availability,
        phone,
        phoneTwo,
        sisben,
        ethnicGroup,
        nationality,
        disability,
        typeDisability,
        addressStudent,
        departmentStudent,
        rural,
        bogota,
        stratum,
        nameGuardian,
        relationship,
        relationshipO,
        documentTypeGuardian,
        numberIdGuardian,
        emailGuardian,
        phoneGuardian,
        phoneGuardianTwo,
        addressGuardian,
        departmentGuardian,
        educationLevelGuardian,
        economic,
        family,
        computer,
        internet,
        interests,
        activity,
        reportage,
        stake,
        webMotivation,
        why,
        methodology,
        want,
        withdrawal,
        logic1,
        logic2,
        logic3,
        logic4
    } = req.body

    const StudentRegistered = await Person.find({ _id: idStudent }).exec()

    

    //THIS VARIABLES SHOW INFORMATION IN FRONT'S VIEW
    let form_name1Person = StudentRegistered.name1Person
    let form_name2Person = StudentRegistered.name2Person
    let form_lastname1Person = StudentRegistered.lastname1Person
    let form_lastname2Person = StudentRegistered.lastname2Person
    let form_documentPerson = StudentRegistered.documentPerson
    let form_emailPerson = StudentRegistered.emailPerson
    let form_institutionPerson = StudentRegistered.institutionPerson
    let form_agePerson = StudentRegistered.agePerson

    //const idAnn = await Announcement.findOne({nameAnnouncement: nameAnnouncement}, {_id:1})
    //console.log(idAnn)

    const idStu = await Person.findOne({ documentPerson: form_documentPerson }, { _id: 1 })
    //console.log(idStu)

    const StudentIntoAnnouncement = await Announcement.findOneAndUpdate({ _id: idAnnouncement }, { $push: { studentsRegistered: idStu } })
    console.log(StudentIntoAnnouncement)

    
    // THE NEXT CALCULATES SCORES BY THE STUDENT
    var form_ScoreProfile = 0
    var form_ScoreVocation = 0
    var form_ScoreMotivation = 0
    var form_ScoreLogic = 0
    var form_ScoreTotal = 0
    var form_stateAnnouncementStudent = "ENABLED"

    // SCORE FOR SECTION PROFILE
    if (gender == "Femenino") {
        form_ScoreProfile += 1
    }
    if (course == "11°") {
        form_ScoreProfile += 1
    }
    if (sena == "NO") {
        form_ScoreProfile += 1
    } else {
        form_stateAnnouncementStudent = "DISABLED"
    }
    if (availability == "SI") {
        form_ScoreProfile += 1
    } else {
        form_stateAnnouncementStudent = "DISABLED"
    }
    if ((stratum <= 3)) {
        form_ScoreProfile += 1
    }
    if (economic != "Desempleado/a") {
        form_ScoreProfile += 1
    } else {
        form_stateAnnouncementStudent = "DISABLED"
    }
    //console.log(form_ScoreProfile)

    if (form_ScoreProfile < 3) {
        form_ScoreProfile = 1
    }
    if (form_ScoreProfile == 4) {
        form_ScoreProfile = 3
    }
    if (form_ScoreProfile == 5) {
        form_ScoreProfile = 4
    }
    if (form_ScoreProfile == 6) {
        form_ScoreProfile = 5
    }
    console.log("Puntaje Perfil: ", +form_ScoreProfile)
    //res.send({message: "Puntaje Perfil: "+form_ScoreProfile})


    // SCORE FOR SECTION VOCATION
    if (interests == "D") {
        form_ScoreVocation += 1
    }
    if (activity == "C") {
        form_ScoreVocation += 1
    }
    if (reportage == "A") {
        form_ScoreVocation += 1
    }
    if (stake == "B") {
        form_ScoreVocation += 1
    }
    if (webMotivation == "C") {
        form_ScoreVocation += 1
    }
    //console.log(form_ScoreVocation)
    if (form_ScoreVocation < 3) {
        form_ScoreVocation = 1
        //console.log("Su vocación está enfocada en otra área diferente a la tecnología")
        // form_statusAnnouncement = "DISABLED"
    }
    if (form_ScoreVocation == 5) {
        //console.log("Cumple con todos los requisitos")
    }
    console.log("Puntaje Vocación: ", +form_ScoreVocation)
    //res.send({message: "Puntaje Vocación: "+form_ScoreVocation })


    // SCORE FOR SECTION MOTIVATION
    if (why == "A") {
        form_ScoreMotivation += 1
    }
    if (methodology == "B") {
        form_ScoreMotivation += 1
    }
    if (want == "A") {
        form_ScoreMotivation += 1
    }
    //console.log(form_ScoreMotivation)
    if (form_ScoreMotivation == 1) {
        form_ScoreMotivation = 1
        //console.log("No sabe nada sobre la escuela o porqué quiere ser parte")
        // form_statusAnnouncement = "DISABLED"
    }
    if (form_ScoreMotivation == 2) {
        form_ScoreMotivation = 3
        //console.log("Conoce algo de la escuela y sus razones están alineadas con lo que ofrece la escuela")
    }
    if (form_ScoreMotivation == 3) {
        form_ScoreMotivation = 5
        //console.log("Explica con detalles qué es la escuela y sus razones están alineadas con lo que ofrecemos")
    }
    console.log("Puntaje Motivación: ", +form_ScoreMotivation)
    //res.send({message: "Puntaje Profile: "+form_ScoreMotivation })


    // SCORE FOR SECTION LOGIC
    if (logic1 == "El orden de llegada es B, C, D, A") {
        form_ScoreLogic += 1
    }
    if (logic2 == "Seis tiburones no son completamente ciegos y tres son completamente ciegos") {
        form_ScoreLogic += 1
    }
    if (logic3 == "E") {
        form_ScoreLogic += 1
    }
    if (logic4 == "D") {
        form_ScoreLogic += 1
    }
    //console.log(form_ScoreLogic)
    if (form_ScoreLogic == 1) {
        form_ScoreLogic = 1
        //console.log("Su vocación está enfocada en otra área diferente a la tecnología")
        // form_statusAnnouncement = "DISABLED"
    }
    if (form_ScoreLogic == 2) {
        form_ScoreLogic = 3
    }
    if (form_ScoreLogic >= 3) {
        form_ScoreLogic = 5
        //console.log("Cumple con todos los requisitos")
    }
    console.log("Puntaje Lógica: ", +form_ScoreLogic)
    //res.send({message: "Puntaje Profile: "+form_ScoreLogic })

    // TOTAL SCORE
    form_ScoreTotal = (form_ScoreProfile * 0.40) + (form_ScoreVocation * 0.30) + (form_ScoreMotivation * 0.15) + (form_ScoreLogic * 0.15)
    console.log("Puntaje Total: ", +form_ScoreTotal)

    if ((form_stateAnnouncementStudent == "DISABLED") || (form_ScoreTotal < 2.0)) {
        form_stateAnnouncementStudent = "DISABLED"
    }

    if ((form_stateAnnouncementStudent == "ENABLED ") && (form_ScoreTotal >= 3.0)) {
        form_stateAnnouncementStudent = "ENABLED"
    }

    // THIS SECTION VALIDATE THE STUDENT AND GUARDIAN'S INFORMATION
    let validations = false

    while (validations == false) {
        if (form_emailPerson == emailGuardian) {
            // alert("Este email ya está registrado por un estudiante. Por favor ingrese un correo diferente")
            res.send("Este email ya está registrado por un estudiante. Por favor ingrese un correo diferente")
            // SEND A CODE TO FRONT 

            if (phone == phoneGuardian) {
                // alertEste teléfono es el mismo del estudiante. Por favor ingrese un teléfono diferente")
                res.send("Este teléfono es el mismo del estudiante. Por favor ingrese un teléfono diferente")
                // SEND A CODE TO FRONT
            }
        }
        else {
            validations = true
        }
    }

    const NewQuestionaryOK = new Questionary({
        idAnnouncement: idAnnouncement,
        idStudent: idStudent,
        q1_name1Person: form_name1Person, 
        q2_name2Person: form_name2Person,
        q3_lastname1Person: form_lastname1Person,
        q4_lastname2Person: form_lastname2Person,
        q5_birthdate: birthdate,
        q6_agePerson: form_agePerson,
        q7_gender: gender,
        q8_document: document,
        q9_documentPerson: form_documentPerson,
        q10_institutionPerson: form_institutionPerson,
        q11_course: course,
        q12_sena: sena,
        q13_availability: availability,
        q14_emailPerson: form_emailPerson,
        q15_phone: phone,
        q16_phoneTwo: phoneTwo,
        q17_sisben: sisben,
        q18_ethnicGroup: ethnicGroup,
        q19_nationality: nationality,
        q20_disability: disability,
        q21_typeDisability: typeDisability,
        q22_addressStudent: addressStudent,
        q23_departmentStudent: departmentStudent,
        q24_rural: rural,
        q25_bogota: bogota,
        q26_stratum: stratum,
        q27_nameGuardian: nameGuardian,
        q28_relationship: relationship,
        q28_1_relationshipO: relationshipO,
        q29_documentTypeGuardian: documentTypeGuardian,
        q30_numberIdGuardian: numberIdGuardian,
        q31_emailGuardian: emailGuardian,
        q32_phoneGuardian: phoneGuardian,
        q33_phoneGuardianTwo: phoneGuardianTwo,
        q34_addressGuardian: addressGuardian,
        q35_departmentGuardian: departmentGuardian,
        q36_educationLevelGuardian: educationLevelGuardian,
        q37_economic: economic,
        q38_family: family,
        q39_computer: computer,
        q40_internet: internet,
        q41_interests: interests,
        q42_activity: activity,
        q43_reportage: reportage,
        q44_stake: stake,
        q45_webMotivation: webMotivation,
        q46_why: why,
        q47_methodology: methodology,
        q48_want: want,
        q49_withdrawal: withdrawal,
        q50_logic1: logic1,
        q51_logic2: logic2,
        q52_logic3: logic3,
        q53_logic4: logic4,
        ScoreProfile: form_ScoreProfile,
        ScoreVocation: form_ScoreVocation,
        ScoreMotivation: form_ScoreMotivation,
        ScoreLogic: form_ScoreLogic,
        ScoreTotal: form_ScoreTotal,
        stateAnnouncementStudent: form_stateAnnouncementStudent,
    })

    NewQuestionaryOK.save();
    console.log("Se ha registrado a la convocatoria con exito")
    res.send(NewQuestionaryOK)
    
    const idRegister = NewQuestionaryOK._id
    console.log(idRegister)

    const formUpdated = await NewQuestionaryOK.findOneAndUpdate(
        { idStudent: idPerson },
            {
            $push: {
                q1_name1Person: StudentRegistered.name1Person,
                q2_name2Person: StudentRegistered.name2Person,
                q3_lastname1Person: StudentRegistered.lastname1Person,
                q4_lastname2Person: StudentRegistered.lastname2Person,
                q6_agePerson: StudentRegistered.agePerson,
                q9_documentPerson: StudentRegistered.documentPerson,
                q10_institutionPerson: StudentRegistered.institutionPerson,
                q14_emailPerson: StudentRegistered.emailPerson,
            },
        }
    );

}

module.exports = {
    RegisterToAnnouncement
}
