package funsets


/**
 * 2. Purely Functional Sets.
 */
object FunSets {
  /**
   * We represent a set by its characteristic function, i.e.
   * its `contains` predicate.
   */
  type Set = Int => Boolean

  /**
   * Indicates whether a set contains a given element.
   */
  def contains(set: Set, elem: Int): Boolean = set(elem)

  /**
   * Returns the set of the one given element.
   */
  def singletonSet(elem: Int): Set = (passedInt: Int) => passedInt == elem
  
  /**
   * Returns the union of the two given sets,
   * the sets of all elements that are in either `s` or `t`.
   */
  def union(set1: Set, set2: Set): Set = (passedInt: Int) => set1(passedInt) || set2(passedInt)

  /**
   * Returns the intersection of the two given sets,
   * the set of all elements that are both in `s` and `t`.
   */
  def intersect(set1: Set, set2: Set): Set = (passedInt: Int) => set1(passedInt) && set2(passedInt)

  /**
   * Returns the difference of the two given sets,
   * the set of all elements of `s` that are not in `t`.
   */
  def diff(s: Set, t: Set): Set = (passedInt: Int) => s(passedInt) && !t(passedInt)

  /**
   * Returns the subset of `s` for which `p` holds.
   */
  def filter(set: Set, p: Int => Boolean): Set = (passedInt: Int) => contains(set, passedInt) && p(passedInt)


  /**
   * The bounds for `forall` and `exists` are +/- 1000.
   */
  val bound = 1000

  /**
   * Returns whether all bounded integers within `s` satisfy `p`.
   */
  def forall(set: Set, fun: Int => Boolean): Boolean = {
    def iter(a: Int): Boolean = {
      if (a > bound) true
      else if (contains(set, a)) fun(a) && iter(a+1)
      else iter(a+1)
    }
    iter(-bound)
  }

  /**
   * Returns whether there exists a bounded integer within `s`
   * that satisfies `p`.
   */
  def exists(set: Set, fun: Int => Boolean): Boolean = !forall(set, (passedInt: Int) => !fun(passedInt))

  /**
   * Returns a set transformed by applying `f` to each element of `s`.
   */
  def map(set: Set, fun: Int => Int): Set = (passedInt : Int) => exists(set, (setInt: Int) => fun(setInt) == passedInt)

  /**
   * Displays the contents of a set
   */
  def toString(s: Set): String = {
    val xs = for (i <- -bound to bound if contains(s, i)) yield i
    xs.mkString("{", ",", "}")
  }

  /**
   * Prints the contents of a set on the console.
   */
  def printSet(s: Set) {
    println(toString(s))
  }
}


/**
  * val set1 = singletonSet(17)
  * -- x => x == 17
  * val set2 = singletonSet(21)
  * -- x => x == 21
  * contains(set1, 17)
  * -- 17 => 17 == 17
  * -- true
  * setUnion = union(set1, set2)
  * -- x =>(x == 17) || (x == 21)
  * contains(setUnion, 21)
  * -- 21 => (21 == 17) || (21 == 21)
  * -- 21 => false || true
  * -- true
  * forall(setUnion, x => x < 20)
  * -- (17 < 20) && (21 < 20)
  * -- true && false
  * -- false
  * exists(setUnion, x => x < 20)
  * -- !(!(17 < 20) && !(21 < 20))
  * -- !(!(true) && !(false))
  * -- !(false && true)
  * -- !(false)
  * -- true
  * mappedUnion = map(setUnion, x => x * 2)
  * -- y => !(!(17 * 2 == y) && !(21 * 2 == y))
  * contains(mappedUnion, 42)
  * -- 42 => !(!(17 * 2 == 42) && !(21 * 2 == 42))
  * -- !(!(34 == 42) && !(42 == 42))
  * -- !(!(false) && !(true))
  * -- !(true && false)
  * -- !(false)
  * -- true
  **/