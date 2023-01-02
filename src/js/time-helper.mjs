function getTimeLeft(endsAt, isShort = false) {
  const diff = new Date(new Date(endsAt).getTime() - new Date().getTime());

  const days = diff.getUTCDate() - 1;
  const hours = diff.getUTCHours() - 1;
  const minutes = diff.getUTCMinutes() - 1;

  let remainingTime = `${days} days ${hours} hours and ${minutes} minutes`;

  if (isShort) {
    remainingTime = `${days}d ${hours}hr ${minutes}min`;
  }

  return remainingTime;
}

export { getTimeLeft };
