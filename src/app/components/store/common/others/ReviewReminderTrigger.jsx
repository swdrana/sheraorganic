"use client";

import { getProductByIds } from "@/app/backend/controllers/product.controller";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import useUserOrders from "../../dataFetching/useUserOrders";
import { useMainContext } from "../../provider/MainContextStore";

const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

const ReviewReminderTrigger = () => {
  const { data: session } = useSession();
  const { userOrders } = useUserOrders();
  const { setReviewReminder } = useMainContext();
  const userId = session?.user?.id;
  const productIds = useMemo(
    () =>
      [...new Set(
        (Array.isArray(userOrders) ? userOrders : [])
          .filter((order) => order.status === "Delivered")
          .flatMap((order) =>
            (order.cart || [])
              .filter((item) => !item.isGift)
              .map((item) => String(item._id || item.productId))
          )
      )],
    [userOrders]
  );

  useEffect(() => {
    if (!userId || productIds.length === 0) return;
    const key = `reviewReminderDismissedAt:${userId}`;
    const dismissedAt = Number(localStorage.getItem(key)) || 0;
    if (Date.now() - dismissedAt < THREE_DAYS) return;

    let active = true;
    getProductByIds(productIds).then((response) => {
      if (!active) return;
      const items = (response?.products || []).filter(
        (product) =>
          !product.ratings?.some(
            (rating) => String(rating.user) === String(userId)
          )
      );
      if (items.length) setReviewReminder({ open: true, items });
    });
    return () => {
      active = false;
    };
  }, [productIds.join("|"), setReviewReminder, userId]);

  return null;
};

export default ReviewReminderTrigger;
