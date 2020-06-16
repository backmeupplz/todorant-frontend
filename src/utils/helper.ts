export async function playSound(audioName: string) {
  const audioFile: HTMLAudioElement = new Audio(audioName)
  return audioFile.play()
}
