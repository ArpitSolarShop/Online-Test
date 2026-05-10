-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidateName" TEXT NOT NULL,
    "candidatePhone" TEXT NOT NULL,
    "candidateRole" TEXT NOT NULL,
    "timeLimitMin" INTEGER NOT NULL,
    "listeningAnswers" JSONB NOT NULL,
    "falseCount" INTEGER NOT NULL,
    "listeningRating" TEXT NOT NULL,
    "competencyAnswers" JSONB NOT NULL,
    "actionScore" INTEGER NOT NULL,
    "processScore" INTEGER NOT NULL,
    "peopleScore" INTEGER NOT NULL,
    "ideaScore" INTEGER NOT NULL,
    "dominantStyle" TEXT NOT NULL,
    "totalSelected" INTEGER NOT NULL,
    "linkId" TEXT,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestResult_candidatePhone_idx" ON "TestResult"("candidatePhone");

-- CreateIndex
CREATE INDEX "TestResult_createdAt_idx" ON "TestResult"("createdAt");
