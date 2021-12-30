



export function LongTxt({ text, isLongTxt  }) {

    function showTxt(text, isLongTxt) {
        if(isLongTxt) return text;
        else return text.substr(0, text.lastIndexOf(' ', 100))
    }

    return (
      <section className="long-txt">
        <p>{showTxt(text, isLongTxt) + ' ' + (isLongTxt ? '':'...')}
        </p>
      </section>
    );
  }