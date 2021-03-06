package recfun

object Main {
  def main(args: Array[String]) {
    println("Pascal's Triangle")
    for (row <- 0 to 10) {
      for (col <- 0 to row)
        print(pascal(col, row) + " ")
      println()
    }
  }

  /**
   * Exercise 1
   */
    def pascal(c: Int, r: Int): Int = {
      if(c <= 0) 1
      else if(r <= 0) 1
      else if(c >= r) 1
      else pascal(c-1,r-1) + pascal(c,r-1)
    }
  
  /**
   * Exercise 2
   */
    def balance(chars: List[Char]): Boolean = {
      def loop(charList: List[Char], count: Int): Boolean ={
        if(count < 0) false
        else if(charList.isEmpty && count != 0) false
        else if(charList.isEmpty && count == 0) true
        else if(charList.head == '(') loop(charList.tail, count+1)
        else if(charList.head == ')') loop(charList.tail, count-1)
        else loop(charList.tail, count)
      }
      loop(chars, 0)
    }

  /**
   * Exercise 3
   */
  def countChange(money: Int, coins: List[Int]): Int = {
    def loop(remainingMoneyToZero: Int, coinsLeft: List[Int]) : Int = {
      if (coinsLeft.isEmpty) 0
      else if (remainingMoneyToZero == 0) 1
      else if (remainingMoneyToZero < 0) 0
      else loop(remainingMoneyToZero - coinsLeft.head, coinsLeft) + loop(remainingMoneyToZero, coinsLeft.tail)
    }

    loop(money, coins.sorted)
  }
}

