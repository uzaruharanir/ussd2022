function formatDescription(description) {
  switch (description) {
    case 'moderate rain':
      return 'Haragwa imvura iringaniye!';
    case 'heavy rain':
      return 'Haragwa imvura nyinshi!';
    case 'light rain':
      return 'Haragwa imvura nkeya!';
    case 'shower rain':
      return 'Haragwa imvura nkeya cyane!';
    case 'heavy intensity rain':
    case 'extreme rain':
    case 'very heavy rain':
      return 'Haragwa imvura nyinshi cyane!';
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      return 'Ikirere kirarangwamo ibicu bike';
    case 'overcast clouds':
      return 'Ikirere kirarangwamo ibicu byinshi';
    case 'sky is clear':
      return 'Haririrwa ikirere gikeye!';
    case 'thunderstorm with light rain':
      return 'Haragwa imvura nkeya irimo inkuba!';
    case 'thunderstorm with rain':
      return 'Haragwa imvura irimo inkuba!';
    case 'thunderstorm with heavy rain':
      return 'Haragwa imvura irimo inkuba nyinshi!';
    default:
      return description;
  }
}

module.exports = { formatDescription };
