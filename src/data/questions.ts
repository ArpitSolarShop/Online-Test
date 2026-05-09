export interface Question {
  id: number;
  textEn: string;
  textHi: string;
}

export interface CompetencyQuestion extends Question {
  style: 'Action' | 'Process' | 'People' | 'Idea';
}

export const listeningQuestions: Question[] = [
  {
    id: 1,
    textEn: "I STOP DOING THINGS WHAT I AM DOING SO AS TO LISTEN",
    textHi: "मैं बातें सुनने के लिए जो काम कर रहा हूँ, उसे बंद कर देता हूँ"
  },
  {
    id: 2,
    textEn: "I JUST LISTEN FOR MAIN IDEAS AND REFERENCE POINTS",
    textHi: "मैं सिर्फ मुख्य बातों को सुनता हूँ।"
  },
  {
    id: 3,
    textEn: "I HAVE A HABIT OF TAKING NOTES WHILE I LISTEN",
    textHi: "जब भी मैं कुछ सुनता हूँ मुझे उसे नोट करने की आदत है"
  },
  {
    id: 4,
    textEn: "I CAN MANAGE DISTRACTIONS DURING LISTENING",
    textHi: "मैं कोई बात सुनने के दौरान अवरोध को मैनेज कर सकता हूँ।"
  },
  {
    id: 5,
    textEn: "MY EMOTIONS ARE CONTROLLED",
    textHi: "मेरी भावनाएं नियंत्रित रहती हैं"
  },
  {
    id: 6,
    textEn: "I TEND TO DISAGREE",
    textHi: "मैं अक्सर असहमत रहता हूँ"
  },
  {
    id: 7,
    textEn: "I LET THE SPEAKER TO FINISH BEFORE RESPONDING",
    textHi: "मैं जवाब देने से पहले स्पीकर को अपनी बात पूरी करने देता हूँ"
  },
  {
    id: 8,
    textEn: "I USUALLY RESPOND WITH SMILE",
    textHi: "मैं आमतौर पर मुस्कराते हुए जवाब देता हूँ"
  },
  {
    id: 9,
    textEn: "I AM WELL AWARE ABOUT MY MANNERISMS",
    textHi: "मैं अपने व्यवहार को अच्छी तरह से जानता हूँ"
  },
  {
    id: 10,
    textEn: "I KNOW MY BIASES AND CONTROL THEM WHEN I LISTEN",
    textHi: "मैं अपनी ध्यान भटकाने वाली बातों को जानता हूं और किसी की बात सुनने के दौरान उन्हें नियंत्रित करता हूँ"
  },
  {
    id: 11,
    textEn: "I STOP MYSELF FROM INTERRUPTING",
    textHi: "मैं खुद को बीच में बोलने से रोकता हूँ।"
  },
  {
    id: 12,
    textEn: "I MAINTAIN EYE CONTACT DURING LISTENING",
    textHi: "मैं किसी की बात सुनने के दौरान आँखों से संपर्क (आई कॉटेक्ट) बनाए रखता हूँ"
  },
  {
    id: 13,
    textEn: "I REPHRASE TO ENSURE THAT I GOT A CLEAR MESSAGE",
    textHi: "मुझे साफ सुनने के लिए स्पीकर से दोहराने के लिए कहता हूँ"
  },
  {
    id: 14,
    textEn: "I ALSO LISTEN FOR EMOTIONS",
    textHi: "मैं दूसरों की भावनाओं को भी समझता हूँ"
  },
  {
    id: 15,
    textEn: "I QUESTION THE SPEAKER FOR CLARIFICATION",
    textHi: "मैं स्पष्टीकरण के लिए वक्ता से सवाल करता हूँ"
  },
  {
    id: 16,
    textEn: "I ACKNOWLEDGE OTHER'S OPINION EVEN IF I DO NOT AGREE WITH THEM",
    textHi: "मैं दूसरे के विचारों को स्वीकार करता हूं, भले ही मैं उससे सहमत न हूँ।"
  },
  {
    id: 17,
    textEn: "I USE HAND FREE TO TAKE NOTES WHILE LISTENING THROUGH PHONE",
    textHi: "फ़ोन पर किसी की बात सुनते समय मैं नोट्स लिखने के लिए अपने हाथ फ्री रखता हूँ।"
  },
  {
    id: 18,
    textEn: "I FOCUS ON WHAT IS BEING SAID BY THE SPEAKER",
    textHi: "मैं वक्ता क्या कह रहा हूं इसपर ध्यान देता हूँ।"
  },
  {
    id: 19,
    textEn: "I PREFER JUDGING MESSAGE RATHER JUDGING THE SPEAKER",
    textHi: "मैं स्पीकर को आंकने के बजाय संदेश पर ध्यान देना पसंद करता हूँ"
  },
  {
    id: 20,
    textEn: "I LISTEN PATIENTLY",
    textHi: "मैं किसी की बात धैर्य से सुनता हूँ"
  }
];

export const competencyQuestions: CompetencyQuestion[] = [
  {
    id: 1,
    style: "Action",
    textEn: "I LIKE ACTION (LIVELINESS, MOVEMENT, HAPPENING)",
    textHi: "मुझे कुछ न कुछ कार्य (क्रियाशील, गतिशील, कुछ करते रहना) करते रहना पसंद है।"
  },
  {
    id: 2,
    style: "Process",
    textEn: "I DEAL WITH PROBLEMS IN A SYSTEMATIC WAY (PLANNED, ORGANIZED, METHODICAL)",
    textHi: "मैं अपनी समस्याओं से व्यवस्थित तरीके (योजनाबद्ध, संगठित, व्यवस्थित) से निपटता हूँ।"
  },
  {
    id: 3,
    style: "People",
    textEn: "I BELIEVE THAT TEAMS ARE MORE EFFECTIVE (EFFICIENT, PRODUCTIVE, COMPETENT) THAN INDIVIDUALS",
    textHi: "मेरा मानना है कि किसी एक व्यक्ति की तुलना में टीम के रुप में कार्य करना अधिक प्रभावी (कुशल, उत्पादक, सक्षम) होता है।"
  },
  {
    id: 4,
    style: "Idea",
    textEn: "I ENJOY INNOVATION (ALTERATION, MODIFICATION, CREATION) VERY MUCH",
    textHi: "मुझे नवाचार (नयी खोज, परिवर्तन, संशोधन, सृजन) बहुत अधिक पसंद है।"
  },
  {
    id: 5,
    style: "Idea",
    textEn: "I AM MORE INTERESTED IN THE FUTURE THAN IN THE PAST",
    textHi: "मैं अतीत की तुलना में भविष्य पर अधिक ध्यान देता हूँ।"
  },
  {
    id: 6,
    style: "People",
    textEn: "I ENJOY WORKING WITH PEOPLE",
    textHi: "मुझे लोगों के साथ काम करना पसंद है"
  },
  {
    id: 7,
    style: "Process",
    textEn: "I LIKE TO ATTEND WELL ORGANIZED GROUP MEETINGS",
    textHi: "मुझे सामूहिक बैठकों में भाग लेना अच्छा लगता है।"
  },
  {
    id: 8,
    style: "Action",
    textEn: "DEADLINES (TIMELINE) ARE IMPORTANT FOR ME",
    textHi: "मेरे लिए किसी कार्य को समय-सीमा (निर्धारित समय) के अंदर पूरा करना महत्वपूर्ण है"
  },
  {
    id: 9,
    style: "Action",
    textEn: "I CANNOT STAND PROCRASTINATION (DELAYING THINGS UNNECESSARILY)",
    textHi: "मैं किसी कार्य को करने में विलंब (अनावश्यक रूप से देरी करना) नहीं करता हूँ"
  },
  {
    id: 10,
    style: "Process",
    textEn: "I BELIEVE THAT NEW IDEAS HAVE TO BE TESTED BEFORE BEING USED",
    textHi: "मेरा मानना है कि किसी नए विचार का इस्तेमाल करने से पहले उसका परीक्षण किया जाना चाहिए"
  },
  {
    id: 11,
    style: "People",
    textEn: "I ENJOY THE STIMULATION (INCENTIVE, INCITEMENT, REFRESHMENT) OF INTERACTION WITH OTHERS",
    textHi: "मैं दूसरों के साथ बातचीत करने में मिलने वाली प्रेरणा (प्रोत्साहन, उत्तेजना, सुख) का आनंद लेता हूँ"
  },
  {
    id: 12,
    style: "Idea",
    textEn: "I AM ALWAYS LOOKING FOR NEW POSSIBILITIES (OPPORTUNITIES, OPTIONS)",
    textHi: "मैं हमेशा नई संभावनाओं (अवसर, विकल्प) की तलाश में रहता हूँ।"
  },
  {
    id: 13,
    style: "Action",
    textEn: "I WANT TO SET UP MY OWN OBJECTIVES (PURPOSE, AMBITION, ASPIRATION, TARGET)",
    textHi: "मैं अपने स्वयं के लिए लक्ष्य (उद्देश्य, महत्वाकांक्षा, आकांक्षा, लक्ष्य) स्थापित करना चाहता हूँ।"
  },
  {
    id: 14,
    style: "Process",
    textEn: "WHEN I START SOMETHING. I GO THROUGH UNTIL THE END",
    textHi: "मैं कोई कार्य शुरू करता हूँ। तो मैं उसे समाप्त करके ही दम लेता हूँ।"
  },
  {
    id: 15,
    style: "People",
    textEn: "BASICALLY TRY TO UNDERSTAND OTHER PEOPLE'S EMOTIONS",
    textHi: "मैं हमेशा दूसरों की भावनाओं को समझने की कोशिश करता हूँ"
  },
  {
    id: 16,
    style: "Idea",
    textEn: "I DO CHALLENGE (CHECK, TEST, CONFRONT) PEOPLE AROUND ME",
    textHi: "मैं आपने साथ काम कर रहे लोगों के लिए चुनौती (जांच, परीक्षा, मुकाबला) खड़ा करता हूँ"
  },
  {
    id: 17,
    style: "Action",
    textEn: "I LOOK FORWARD TO RECEIVING FEEDBACK ON MY PERFORMANCE",
    textHi: "मैं अपने कार्य प्रदर्शन पर प्रतिक्रिया जानने करने के लिए तैयार रहता हूँ।"
  },
  {
    id: 18,
    style: "Process",
    textEn: "I FIND THE STEP-BY-STEP (PLANNED, ORGANIZED, SYSTEMATIC) APPROACH VERY EFFECTIVE",
    textHi: "मुझे किसी कार्य को करने में चरण-दर-चरण (योजनाबद्ध, व्यवस्थित, क्रमबद्ध) दृष्टिकोण अधिक प्रभावी लगता है।"
  },
  {
    id: 19,
    style: "People",
    textEn: "I THINK I AM GOOD AT READING PEOPLE",
    textHi: "मुझे लगता है कि मैं लोगों को जल्द समझ जाता हूँ"
  },
  {
    id: 20,
    style: "Idea",
    textEn: "I LIKE CREATIVE PROBLEM SOLVING",
    textHi: "मुझे किसी समस्या को रचनात्मक ढंग से हल करना पसंद है"
  },
  {
    id: 21,
    style: "Idea",
    textEn: "I EXTRAPOLATE (EXTEND) AND PROJECT ALL THE TIME",
    textHi: "मैं खुले विचारों (ओपन) का हूँ और हमेशा ऐसा ही प्रदर्शित करता हूँ।"
  },
  {
    id: 22,
    style: "People",
    textEn: "I AM SENSITIVE (CONSCIOUS, EMOTIONAL, RECEPTIVE) TO OTHERS' NEEDS",
    textHi: "मैं दूसरों की जरूरतों के प्रति संवेदनशील (जागरूक, भावनात्मक, ग्रहणशील) हूँ"
  },
  {
    id: 23,
    style: "Process",
    textEn: "PLANNING IS THE KEY TO SUCCESS",
    textHi: "योजना सफलता की कुंजी है।"
  },
  {
    id: 24,
    style: "Action",
    textEn: "I BECOME IMPATIENT WITH LONG DELIBERATIONS (SPECULATION, DEBATE, SERIOUS THINKING, REFLECTION, DISCUSSION)",
    textHi: "मैं लंबे विचार-विमर्श (बात-चीत, बहस, गंभीर सोच-विचार, चर्चा) के दौरान ऊब जाता हूँ।"
  },
  {
    id: 25,
    style: "Process",
    textEn: "I AM COOL UNDER PRESSURE (STRESS, ANXIETY, BURDEN, TENSION)",
    textHi: "मैं दबाव (तनाव, चिंता, प्रेशर, तनाव) में शांत रहता हूँ।"
  },
  {
    id: 26,
    style: "Action",
    textEn: "I VALUE EXPERIENCE VERY MUCH",
    textHi: "मैं अनुभव को अधिक महत्व देता हूँ।"
  },
  {
    id: 27,
    style: "People",
    textEn: "I LISTEN TO PEOPLE",
    textHi: "मैं लोगों की बात सुनता हूँ"
  },
  {
    id: 28,
    style: "Idea",
    textEn: "PEOPLE SAY THAT I AM A FAST THINKER",
    textHi: "लोग कहते हैं कि मैं किसी बात को बहुत तेजी से सोच लेता हूँ।"
  },
  {
    id: 29,
    style: "People",
    textEn: "COOPERATION IS A KEY WORD FOR ME.",
    textHi: "मेरे लिए सहयोग करना महत्वपूर्ण है।"
  },
  {
    id: 30,
    style: "Process",
    textEn: "I USE LOGICAL METHODS TO TEST ALTERNATIVES (OPTIONS, SUBSTITUTE)",
    textHi: "मैं विकल्पों (ऑप्शन) की जांच करने के लिए तर्कसंगत तरीकों का उपयोग करता हूँ"
  },
  {
    id: 31,
    style: "Action",
    textEn: "I LIKE TO HANDLE SEVERAL (MANY) PROJECTS AT THE SAME TIME.",
    textHi: "मुझे एक वक्त पर कई प्रोजेक्ट्स हैंडल करना पसंद है"
  },
  {
    id: 32,
    style: "Idea",
    textEn: "I ALWAYS QUESTION MYSELF",
    textHi: "मैं हमेशा अपने आप से सवाल करता हूँ"
  },
  {
    id: 33,
    style: "Action",
    textEn: "I LEARN BY DOING",
    textHi: "मैं किसी कार्य को करके सीखता हूँ"
  },
  {
    id: 34,
    style: "Process",
    textEn: "I BELIEVE THAT MY HEAD RULES MY HEART",
    textHi: "मेरा मानना है कि मेरे दिमाग की बात मेरा दिल मानता है।"
  },
  {
    id: 35,
    style: "People",
    textEn: "I CAN PREDICT (ANTICIPATE) HOW OTHERS MAY REACT (ACT, BEHAVE, COUNTER) TO A CERTAIN ACTION",
    textHi: "मैं पहले ही जान सकता हूँ (अनुमान लगा सकता हूं) कि किसी कार्य पर दूसरों कि प्रतिक्रिया (कार्य, व्यवहार, काउंटर) क्या हो सकती है।"
  },
  {
    id: 36,
    style: "Idea",
    textEn: "I DO NOT LIKE DETAILS",
    textHi: "मुझे विस्तृत जानकारी लेना पसंद नहीं है"
  },
  {
    id: 37,
    style: "Process",
    textEn: "ANALYSIS SHOULD ALWAYS PRECEDE ACTION.",
    textHi: "कोई कार्य करने से पहले विश्लेषण किया जाना चाहिए।"
  },
  {
    id: 38,
    style: "People",
    textEn: "I AM ABLE TO ASSESS THE CLIMATE OF A GROUP",
    textHi: "मैं किसी ग्रुप के माहौल का मूल्यांकन करने में सक्षम हूँ।"
  },
  {
    id: 39,
    style: "Idea",
    textEn: "I HAVE A TENDENCY TO START THINGS AND NOT FINISH THEM UP",
    textHi: "मुझे काम शुरू करने और खत्म न करने की आदत है।"
  },
  {
    id: 40,
    style: "Action",
    textEn: "I PERCEIVE MYSELF AS DECISIVE (ABILITY TO TAKE QUICK DECISIONS)",
    textHi: "मुझे लगता है कि मैं अच्छे एवं सही निर्णय (डिसिशन) ले सकता हूँ।"
  },
  {
    id: 41,
    style: "Action",
    textEn: "I SEARCH FOR CHALLENGING TASKS",
    textHi: "मुझे चुनौतीपूर्ण कार्य करना पसंद हैं।"
  },
  {
    id: 42,
    style: "Process",
    textEn: "I RELY ON OBSERVATION AND DATA",
    textHi: "मैं अवलोकन और डेटा पर भरोसा करता हूँ।"
  },
  {
    id: 43,
    style: "People",
    textEn: "I CAN EXPRESS MY FEELINGS OPENLY (BOUNDRYLESS, CANDIDLY, BLATANTLY)",
    textHi: "मैं अपनी भावनाओं को खुलकर (बिना हिचक के, खुलकर, स्पष्ट रूप से) व्यक्त कर सकता हूँ"
  },
  {
    id: 44,
    style: "Idea",
    textEn: "I LIKE TO DESIGN (ESTABLISH, BUILD, CONCEIVE, DEVISE, CREATE) NEW PROJECTS",
    textHi: "मैं नए प्रोजेक्ट्स डिजाइन (स्थापित करना, निर्माण करना, कल्पना करना, बनाना) पसंद है"
  },
  {
    id: 45,
    style: "Idea",
    textEn: "I ENJOY READING VERY MUCH",
    textHi: "मुझे पढ़ना पसंद है।"
  },
  {
    id: 46,
    style: "People",
    textEn: "I PERCEIVE MYSELF AS A FACILITATOR",
    textHi: "मैं अपने आप को दूसरों के साथ मिलकर काम करने वाला मानता हूँ"
  },
  {
    id: 47,
    style: "Process",
    textEn: "I LIKE TO FOCUS ON ONE ISSUE AT A TIME",
    textHi: "मैं एक समय में एक ही समस्या पर ध्यान केंद्रित करना चाहता हूँ"
  },
  {
    id: 48,
    style: "Action",
    textEn: "I LIKE TO ACHIEVE (ACCOMPLISH, ATTAIN, EARN, OBTAIN, ACQUIRE)",
    textHi: "मुझे अपने लक्ष्य को पूरा (प्राप्त, लाभ हासिल करना, अधिग्रहण करना) करना पसंद है"
  },
  {
    id: 49,
    style: "People",
    textEn: "I ENJOY LEARNING ABOUT OTHERS",
    textHi: "मैं दूसरों के बारे में जानना अच्छा लगता है"
  },
  {
    id: 50,
    style: "Action",
    textEn: "I LIKE VARIETY (ARRAY, ASSORTMENT, COLLECTION, DIVERSITY)",
    textHi: "मुझे विविधता (सरणी, वर्गीकरण, विविधता) पसंद है।"
  },
  {
    id: 51,
    style: "Process",
    textEn: "FACTS (DATA, DETAILS, CERTAINTY) SPEAK FOR THEMSELVES",
    textHi: "तथ्यों (डेटा, विवरण, निश्चितता) से सारी जानकारी मिल जाती है।"
  },
  {
    id: 52,
    style: "Idea",
    textEn: "I USE MY IMAGINATION (IDEA, ORIGINALITY, THOUGHT, VISION, WIT) AS MUCH AS POSSIBLE",
    textHi: "मैं अपनी कल्पना (विचार, मौलिकता, दृष्टि, दिमाग) जितना संभव हो उतना उपयोग करता हूँ।"
  },
  {
    id: 53,
    style: "Action",
    textEn: "I AM IMPATIENT (ANXIOUS, EAGER, IRRITABLE, RESTLESS) WITH LONG SLOW ASSIGNMENTS",
    textHi: "मैं किसी कार्य के धीरे धीरे होने पर अपना धैर्य खो (उत्सुक, चिड़चिड़ा, बेचैन) देता हूँ।"
  },
  {
    id: 54,
    style: "Idea",
    textEn: "MY MIND NEVER STOPS WORKING",
    textHi: "मेरा दिमाग हर वक्त काम करता रहता है।"
  },
  {
    id: 55,
    style: "Process",
    textEn: "KEY DECISIONS HAVE TO BE MADE IN AS CAUTIOUS (PRUDENT, DISCREET, JUDIOUS, VIGILANT) WAY",
    textHi: "महत्वपूर्ण निर्णय सावधानीपूर्वक (विवेकपूर्ण, विचारशील, न्यायी, सतर्क) तरीके से किया जाना चाहिए"
  },
  {
    id: 56,
    style: "People",
    textEn: "I STRONGLY BELIEVE THAT PEOPLE NEED EACH OTHER TO GET WORK DONE",
    textHi: "मेरा मानना है कि किसी काम को करने के लिए लोगों को एक-दूसरे की जरूरत होती है।"
  },
  {
    id: 57,
    style: "Action",
    textEn: "I USUALLY MAKE DECISIONS WITHOUT THINKING TOO MUCH",
    textHi: "मैं आमतौर पर बहुत ज्यादा सोचे बिना निर्णय लेता हूँ।"
  },
  {
    id: 58,
    style: "Process",
    textEn: "EMOTIONS CREATE PROBLEMS",
    textHi: "भावनाएं समस्याएं पैदा करती हैं।"
  },
  {
    id: 59,
    style: "People",
    textEn: "I LIKE TO BE LIKED BY OTHERS",
    textHi: "जब मुझे कोई दूसरा पसंद करता है तो मुझे अच्छा लगता है।"
  },
  {
    id: 60,
    style: "Idea",
    textEn: "I CAN PUT TWO AND TWO TOGETHER VERY QUICKLY (I AM VERY QUICK AT MAKING DECISIONS)",
    textHi: "मैं कोई भी निर्णय बहुत जल्द ले सकता हूं (मैं निर्णय बहुत जल्द लेता हूँ)"
  },
  {
    id: 61,
    style: "Idea",
    textEn: "I TRY OUT MY NEW IDEAS ON PEOPLE",
    textHi: "मैं लोगों पर अपने नए विचारों को आजमाने की कोशिश करता हूँ"
  },
  {
    id: 62,
    style: "Process",
    textEn: "I BELIEVE IN THE SCIENTIFIC (EXPERIMENTAL, MATHEMATICAL, OBJECTIVE) APPROACH",
    textHi: "मैं वैज्ञानिक (प्रयोगात्मक, गणितीय, उद्देश्यात्मक) दृष्टिकोण में विश्वास करता हूँ।"
  },
  {
    id: 63,
    style: "Action",
    textEn: "I LIKE TO GET THINGS DONE",
    textHi: "मुझे काम करना पसंद है।"
  },
  {
    id: 64,
    style: "People",
    textEn: "GOOD RELATIONSHIPS ARE ESSENTIAL",
    textHi: "अच्छे संबंध आवश्यक हैं।"
  },
  {
    id: 65,
    style: "Action",
    textEn: "I AM IMPULSIVE (SPONTANEOUS, INSTINCTIVE, HASTY, IMPETUOUS)",
    textHi: "मैं आवेगी (सहज, जल्दबाजी करने वाला) हूँ।"
  },
  {
    id: 66,
    style: "Process",
    textEn: "I ACCEPT DIFFERENCE (DIVERSITY, DISSIMILARITY, DISTINCTIVENESS, DIVERGENCE, MULTIPLICITY) IN PEOPLE",
    textHi: "मैं लोगों की अलग अलग विशेषताओं (विविधता, असमानता, विशिष्टता, विचलन, बहुलता) को स्वीकार करता हूँ।"
  },
  {
    id: 67,
    style: "People",
    textEn: "COMMUNICATING WITH PEOPLE IS AN END IN ITSELF (NOTHING ELSE IS REQUIRED IF YOU HAVE GOOD COMMUNICATION)",
    textHi: "लोगों के साथ बातचीत खुद व खुद खत्म (यदि आप अच्छी बातें करते हैं तो कुछ और करने की जरुरत नहीं है) हो जाती है।"
  },
  {
    id: 68,
    style: "Idea",
    textEn: "I LIKE TO BE INTELLECTUALLY STIMULATED (CEREBRAL, THOUGHTFUL, SCHOLARLY)",
    textHi: "मुझे बौद्धिक (मस्तिष्क, विचारशील, विद्वान) रूप से प्रेरित होना पसंद है।"
  },
  {
    id: 69,
    style: "Process",
    textEn: "I LIKE TO ORGANIZE (PLAN, SYSTEMATIZE, FORMULATE)",
    textHi: "मुझे व्यवस्थित करना (योजना, व्यवस्थित करना, तैयार करना) पसंद है।"
  },
  {
    id: 70,
    style: "Action",
    textEn: "I USUALLY JUMP FROM ONE TASK TO ANOTHER (I AM INDECISIVE)",
    textHi: "मैं आम तौर पर एक काम को करते करते दूसरा काम (मैं निर्णय नहीं कर पाता हूँ) करने लगता हूँ"
  },
  {
    id: 71,
    style: "People",
    textEn: "TALKING AND WORKING WITH PEOPLE IS A CREATIVE ART",
    textHi: "लोगों से बात करना और उनके साथ काम करना एक रचनात्मक कला है"
  },
  {
    id: 72,
    style: "Idea",
    textEn: "SELF-ACTUALIZATION (SELF-AWARENESS, CONSCIOUSNESS) IS A KEY WORD FOR ME",
    textHi: "आत्म-वास्तविकता (आत्म जागरूकता, चेतना) मेरे लिए महत्वपूर्ण है।"
  },
  {
    id: 73,
    style: "Idea",
    textEn: "I ENJOY PLAYING WITH IDEAS",
    textHi: "मुझे नए नए विचार पसंद हैं।"
  },
  {
    id: 74,
    style: "Action",
    textEn: "I DISLIKE WASTING MY TIME",
    textHi: "मैं अपना समय बर्बाद करना पसंद नहीं है"
  },
  {
    id: 75,
    style: "Process",
    textEn: "I ENJOY DOING WHAT I AM GOOD AT",
    textHi: "मुझे वो कार्य करना पसंद है जो मुझे अच्छा लगता है।"
  },
  {
    id: 76,
    style: "People",
    textEn: "I LEARN BY INTERACTING (COMMUNICATION, SYNERGY) WITH OTHERS",
    textHi: "मैं दूसरों के साथ बातचीत (संचार, तालमेल) करके सीखता हूँ।"
  },
  {
    id: 77,
    style: "Idea",
    textEn: "I FIND ABSTRACT INTERACTIONS INTERESTING AND ENJOYABLE",
    textHi: "मुझे बिना मतलब की बातचीत (काल्पनिक, दार्शनिक, गूढ़, असत्य, अनिश्चित, ट्रान्सेंडेंटल) दिलचस्प और मनोरंजक लगती है।"
  },
  {
    id: 78,
    style: "Process",
    textEn: "I AM PATIENT (CALM, GENTLE, TOLERANT, QUIET) WITH DETAILS",
    textHi: "मुझे विस्तृत (शांत, कोमल, सहिष्णु, चुप) विवरण पसंद है।"
  },
  {
    id: 79,
    style: "Action",
    textEn: "I LIKE BRIEF TO THE POINT (CONCISE, SUCCINCT, PITHY) STATEMENTS",
    textHi: "मुझे सिर्फ काम की बात (संक्षेप, संक्षिप्त, मिथ्या) पसंद करता हूँ।"
  },
  {
    id: 80,
    style: "People",
    textEn: "I FEEL CONFIDENT (SELF-ASSURED, SELF-RELIANT, CONVINCED) IN MYSELF",
    textHi: "मुझमें आत्मविश्वास (आत्मनिर्भर, आश्वस्त) है।"
  }
];

export const styleDescriptions: Record<string, {
  code: string;
  title: string;
  titleHi: string;
  focus: string;
  focusHi: string;
  color: string;
  description: string;
  descriptionHi: string;
  content: string[];
  contentHi: string[];
  process: string[];
  processHi: string[];
}> = {
  Action: {
    code: "A",
    title: "ACTION (A)",
    titleHi: "एक्शन (A)",
    focus: "What",
    focusHi: "क्या",
    color: "bg-amber-500",
    description: "Results | Objectives | Achieving | Doing",
    descriptionHi: "परिणाम | उद्देश्य | उपलब्धि | कार्य करना",
    content: ["Decisions / Results", "Objectives", "Performance", "Productivity", "Efficiency", "Moving ahead"],
    contentHi: ["निर्णय / परिणाम", "उद्देश्य", "प्रदर्शन", "उत्पादकता", "दक्षता", "आगे बढ़ना"],
    process: ["Pragmatic (down to earth)", "Direct (to the point)", "Impatient", "Decisive", "Quick (Jump from idea to idea)", "Energetic (Challenge others)"],
    processHi: ["व्यावहारिक", "सीधा (बात पर आना)", "अधीर", "निर्णायक", "तेज़ (एक विचार से दूसरे पर)", "ऊर्जावान (दूसरों को चुनौती)"]
  },
  Process: {
    code: "PR",
    title: "PROCESS (PR)",
    titleHi: "प्रोसेस (PR)",
    focus: "How",
    focusHi: "कैसे",
    color: "bg-blue-500",
    description: "Strategies | Organization | Facts",
    descriptionHi: "रणनीतियाँ | संगठन | तथ्य",
    content: ["Facts", "Procedures", "Planning", "Organizing", "Controlling", "Testing"],
    contentHi: ["तथ्य", "प्रक्रियाएं", "योजना", "संगठन", "नियंत्रण", "परीक्षण"],
    process: ["Systematic (step-by-step)", "Logical (cause and effect)", "Factual", "Verbose", "Unemotional", "Eye for detail"],
    processHi: ["क्रमबद्ध (चरण-दर-चरण)", "तार्किक (कारण और प्रभाव)", "तथ्यात्मक", "विस्तृत", "भावनाहीन", "विवरण पर ध्यान"]
  },
  People: {
    code: "PE",
    title: "PEOPLE (PE)",
    titleHi: "पीपल (PE)",
    focus: "Who",
    focusHi: "कौन",
    color: "bg-emerald-500",
    description: "Communication | Relationships | Teamwork",
    descriptionHi: "संवाद | संबंध | टीम वर्क",
    content: ["Relations", "Motivation", "Needs", "Teamwork", "Communication", "Feelings", "Team Spirit"],
    contentHi: ["संबंध", "प्रेरणा", "जरूरतें", "टीम वर्क", "संवाद", "भावनाएं", "टीम भावना"],
    process: ["Spontaneous", "Empathetic", "Warm", "Subjective", "Emotional", "Perceptive", "Sensitive"],
    processHi: ["सहज", "सहानुभूतिपूर्ण", "उदार", "व्यक्तिपरक", "भावनात्मक", "सूक्ष्मदर्शी", "संवेदनशील"]
  },
  Idea: {
    code: "I",
    title: "IDEA (I)",
    titleHi: "आइडिया (I)",
    focus: "Why",
    focusHi: "क्यों",
    color: "bg-purple-500",
    description: "Concepts | Theories | Innovation",
    descriptionHi: "अवधारणाएं | सिद्धांत | नवाचार",
    content: ["Concepts", "Independence", "New Ways / Alternative", "Possibilities", "New methods", "Improving", "Problems"],
    contentHi: ["अवधारणाएं", "स्वतंत्रता", "नए तरीके / विकल्प", "संभावनाएं", "नई विधियां", "सुधार", "समस्याएं"],
    process: ["Imaginative", "Charismatic", "Difficult to understand", "Ego-centered", "Unrealistic", "Creative", "Provocative"],
    processHi: ["कल्पनाशील", "आकर्षक", "समझना कठिन", "अहंकेंद्रित", "अवास्तविक", "रचनात्मक", "उत्तेजक"]
  }
};
