defmodule Memory.Game do

  def new() do
    
    %{
       letters: initLst(),
       matching: [],
       show: [],
       clicks: 0,
       click_disabled: false
     }
  end

  def client_view(game) do
    letters = game.letters
    matching = game.matching
    show = game.show
    clicks = game.clicks
    click_disabled = game.click_disabled

    %{
       letters: letters,
       matching: matching,
       show: show,
       clicks: clicks,
       click_disabled: click_disabled
     }
  end

  def clickHandler(game,index) do
    letters = game.letters
    matching = game.matching
    show = game.show
    clicks = game.clicks + 1
    click_disabled = game.click_disabled

    Map.put(game, :clicks,clicks)
    |>Map.put(:matching,Enum.concat(matching,[index]))
  end
    
  def check_match(game) do
    if(Enum.at(game.letters,Enum.at(game.matching,0)) == Enum.at(game.letters,Enum.at(game.matching,1))) do
      game
      |>Map.put(:show, Enum.concat(game.show,game.matching))
      |>Map.put(:matching, [])
    else
      :timer.sleep(1000);
      game
      |>Map.put(:matching, [])
      
    end

  end

  def restart(game) do
    new()
  end

  def initLst() do

    letters = ["A", "B", "C", "D", "E", "F", "G", "H"]

    Enum.shuffle(letters ++ letters)

  end
end
